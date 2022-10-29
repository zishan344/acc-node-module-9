const { createUser } = require("../Service/user.service");
exports.createNewUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res
      .status(200)
      .json({
        status: "success",
        message: "successfully create user",
        user: user,
      });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};
