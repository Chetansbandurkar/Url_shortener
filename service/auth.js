// const sessionIdToUserMap=new Map();
// state maintain kr rahe the 
// ab to nhi karna so  import "jsonwebtoken"
const jwt = require("jsonwebtoken");
const secret = "chetan@1232";

// ./contorller/user 
// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }

// ye function mere liye tokens banayega 
function setUser(user) {
    return jwt.sign ({
        _id: user._id,
        email: user.email,
        role:user.role,
    },
        secret
    )
}

// Use in the middle ./sevice/middlewear
function getUser(token) {
    if (!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser,
};