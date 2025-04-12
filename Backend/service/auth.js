const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "Yuvraj@123456";

function generateToken(user) {
    const payLoad={
        _id:user._id,
        email:user.email,
        name:user.username,
        // name:user.username
    };
    return jwt.sign(payLoad, JWT_SECRET );

}
function verifyToken(token){
 return jwt.verify(token,JWT_SECRET);
}
module.exports={
    generateToken,
    verifyToken
}

