import multer from "multer";

export const localsMiddleware=(req,res,next)=>{
    res.locals.loggedIn=Boolean(req.session.loggedIn);
    res.locals.siteName="Wetube";
    res.locals.loggedInUser=req.session.user || {};
    next();
}//서버와 템플릿(pug랑 공유할 수 있게 로컬 오브젝트에 추가)

export const protectorMiddleware=(req,res,next)=>{
    if(req.session.loggedIn){
        next();
    }else{
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware=(req,res,next)=>{
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/");
    }
};
//upload middleware 
export const avatarUpload = multer({
    dest:"uploads/avatars/",
    limits:{fileSize:3000000,
    },
});
export const videoUpload= multer({
    dest:"uploads/videos/",
    limits:{fileSize:10000000,
    },
});