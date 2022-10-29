const jwt = require("jsonwebtoken");
exports.generateToken = async (userInfo) => {
  const payload = {
    email: userInfo.email,
    role: userInfo.role,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "7days",
  });

  return token;
};
