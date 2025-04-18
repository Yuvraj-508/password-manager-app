const { verifyToken } =require("../service/auth");

function checkAuth(req,res,next){
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token" });
      }
        // console.log(authHeader)
      const token = authHeader.split(" ")[1];
      
  try {
    const decoded = verifyToken(token)
    req.user = decoded; // { id: userId }
    next(); // move to the next middleware/route
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

}

module.exports={
    checkAuth
}