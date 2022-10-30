const jwt = require("jsonwebtoken");

const {
  createUser,
  findUserByEmail,
  deleteUser,
} = require("../Service/user.service");
const { sendMailWithGmail } = require("../utils/email");

const { generateToken } = require("../utils/token");
exports.createNewUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const mailData = {
      to: [user.email],
      subject: "Verify your Account",
      text: "Thank You",
    };
    sendMailWithGmail(mailData);
    res.status(200).json({
      status: "success",
      message: "successfully create user",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

/* 
* 1. Check if Email and password are given,
* 2. Load user with email,
* 3. if not user send res,
* 4. compare password,
* 5. check if user is active,
* 6. if not active send res,
* 7. generate token,
* 9. send user and token

*/
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ status: "fail", error: "please provide your credentials" });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found please create an account",
      });
    }
    const isValidPassword = user.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res
        .status(403)
        .json({ status: "failed", message: "Invalid password" });
    }
    if (user.status !== "active") {
      return res
        .status(403)
        .json({ status: "fail", error: "Your account is not an active" });
    }

    const token = await generateToken(user);
    const { password: pwt, ...others } = user.toObject();
    console.log(token);
    res.status(200).json({
      status: "success",
      message: "successfully Login user",
      data: {
        others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};
exports.getMe = async (req, res) => {
  try {
    // console.log(req.email);
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found please create an account",
      });
    }
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "couldn't get the data",
      error: error.message,
    });
  }
};
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteU = await deleteUser(id);
    res.status(200).json({
      status: "success",
      message: "deleteUser successfully",
      data: deleteU,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};
