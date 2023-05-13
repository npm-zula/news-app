const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authorize = (roles) => async (req, res, next) => {
  try {
    // console.log("hi")
    // Retrieve token from the cookie
    // const token = req.cookies.token;
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("Unauthorized access");

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userfound = await User.findById(decoded.id);

    if (!userfound) throw new Error("User not found");
    if (!roles.includes(userfound.role)) throw new Error("Unauthorized access");
    req.user = userfound;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Unauthorized");
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, payload) => {
    if (err) return res.status(401).send("Unauthorized");
    req.user = { id: payload.id, role: payload.role };
    next();
  });
}

module.exports = {
  authenticate,
  authorize,
};
