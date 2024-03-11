import Video from "../models/Video"; //Video모델 임포트


export const home = async (req, res) => {
  const videos = await Video.find({}).sort({createdAt:"desc"});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch=async(req,res)=>{
    const {id}=req.params; //const id=req.params.id;랑 같음
    const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit=async(req,res)=>{
    const {id}=req.params;
    const video=await Video.findById(id);
    if(!video){
      return res.status(404).render("404",{pageTitle:"Video not found."});
    }
    return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit=async(req,res)=>{
    const {id}=req.params;
    const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id});
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id,{title,description,hashtags:Video.formatHashtags(hashtags)
    ,});
  return res.redirect(`/videos/${id}`);
};

export const getUpload=(req,res)=>{
  return res.render("upload", { pageTitle: "Upload"});
}

export const postUpload=async(req,res)=>{
  const { title,description,hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags:Video.formatHashtags(hashtags),
    });
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
    })
  }
  return res.render("search",{pageTitle:"Search",videos});

}