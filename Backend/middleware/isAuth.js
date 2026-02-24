import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
     
    console.log("Token received:", req.cookies);

    if (!token) {
      return res.status(400).json({ message: "not have token" });
    }

    let verifytoken = jwt.verify(token, process.env.JWT_SECRET);

    console.log(" Verified token:", verifytoken);

    req.userId = verifytoken.userid;

    next();
  } catch (error) {
    console.log("❌ isAuth error:", error);
    return res.status(500).json({ message: "Internal server isAuth error" });
  }
};



export default isAuth;