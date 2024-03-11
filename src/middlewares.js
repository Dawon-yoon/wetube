export const localsMiddleware=(req,res,next)=>{
    res.locals.loggedIn=Boolean(req.session.loggedIn);
    res.locals.siteName="Wetube";
    res.locals.loggedInUser=req.session.user;
    console.log(res.locals);
    next();
}//서버와 템플릿(pug랑 공유할 수 있게 로컬 오브젝트에 추가)