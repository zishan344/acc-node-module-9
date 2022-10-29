const { promisify } = require("util");
const jwt = require("jsonwebtoken");
/*
 * 1.check if token exist,
 * 2. if not token send res,
 * 3. decode the token,
 * 4. if valid next
 */
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1];

    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", error: "You are not logged in" });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ status: "fail", error: err.message });
  }
};
