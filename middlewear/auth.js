const { getUser } = require('../service/auth')

function checkforAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  if (!tokenCookie)
    req.user = null;
  return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}
//  midllewear for authentication 
// agar user login raha to next next 
// async function restrictTOLoggedinUserOnly(req,res,next){
//   // const userUid=req.cookies?.uid;
//   // const userUid=req.headers["authorization"];
//   const token = req.headers.authorization?.split(" ")?.[1]

//   // if(!userUid) return res.redirect('/login');
//   // const token = req.headers.authorization?.split(" ")?.[1]
//   const user= getUser(token);
//   if(!user) return res.redirect("/login");
//   req.user=user;
//   next();
// }

// async function checkAuth(req,res,next){
//   console.log(req.headers);
//  const token = req.headers.authorization?.split(" ")?.[1]
//   // if(!userUid) return res.redirect('/login');
//   // const token=userUid.split("Bearer ")[1];//
//   const user= getUser(token);
//   req.user=user;
//   next();
// }


function restrictTO(roles) {
  return function (req, res, next) {
    // authentication 
    if (!req.user) {
      return res.redirect('/login');
    }

    // authorization 
    if (roles.include(req.user.role)) {
      return res.end("Unauthorized");
    }

    return next();
  };


}
module.exports = {
  // restrictTOLoggedinUserOnly,
  // checkAuth,
  checkforAuthentication,
  restrictTO,
};