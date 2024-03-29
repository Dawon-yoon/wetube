import Video from "../models/Video"; 
import User from "../models/User";
import Comment from "../models/Comment";


export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch=async(req,res)=>{
    const {id}=req.params; 
    const video = await Video.findById(id).populate("owner").populate("comments"); //populate:비디오 객체 안에 오너 객체만들기(유저)
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video});
};

export const getEdit=async(req,res)=>{
    const {id}=req.params;
    const {user:{_id}}=req.session
    const video=await Video.findById(id);
    if(!video){
      return res.status(404).render("404",{pageTitle:"Video not found."});
    }
  if (String(video.owner) !== String(_id)) {
      req.flash("error", "Not authorized");
      return res.status(403).redirect("/");
    }
    return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit=async(req,res)=>{
    const {id}=req.params;
    const {user:{_id}}=req.session;
    const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id});
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
      req.flash("error", "You are not the owner of the video.");
      return res.status(403).redirect("/");
    }
  await Video.findByIdAndUpdate(id,{title,description,hashtags:Video.formatHashtags(hashtags)
    ,
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
};

export const getUpload=(req,res)=>{
  return res.render("upload", { pageTitle: "Upload"});
}

export const postUpload=async(req,res)=>{
  const {
    user:{_id},
  }=req.session;
  const { video, thumb } = req.files;
  console.log(video, thumb);
  const { title,description,hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      owner:_id,
      hashtags:Video.formatHashtags(hashtags),
    });
    const user=await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
}

export const deleteVideo=async(req,res)=>{
  const { id }= req.params;
  const {user:{_id}}=req.session;
  const video=await Video.findById(id);
  if(!video){
      return res.status(404).render("404",{pageTitle:"Video not found."});
    }
  if(String(video.owner) !== String(_id)){
      return res.status(403).redirect("/");
    }
  //delete video
  await Video.findByIdAndDelete(id); 
  return res.redirect("/");
}

export const search=async(req,res)=>{
  const {keyword}=req.query;
  let videos=[];
  if(keyword){
    videos=await Video.find({
      title:{
        $regex:new RegExp(`${keyword}$`,"i")
      },//레귤러 익스프레션으로 키워드가 들어간 것을 찾게함!(몽고디비의 필터엔진)
    }).populate("owner");
  }
  return res.render("search",{pageTitle:"Search",videos});
}

export const registerView=async(req,res)=>{
  const { id } =req.params;
  const video=await Video.findById(id);
  if(!video){
    return res.sendStatus(404);
  }
  video.meta.views=video.meta.views+1;
  await video.save();
  return res.sendStatus(200);
}

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const { id, videoid } = req.body; // comment id, video id
  const { _id } = req.session.user; // user id
  const { owner } = await Comment.findById(id);
  const video = await Video.findById(videoid);
  if (String(owner) !== _id) return res.sendStatus(403);
  else {
    await Comment.findByIdAndDelete(id);
    video.comments.splice(video.comments.indexOf(videoid), 1);
    video.save();
    return res.sendStatus(200);
  }
};