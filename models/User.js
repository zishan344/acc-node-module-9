const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is  required"],
      validate: [validator.isEmail, "provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: (value) => {
        validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 3,
          minUppercase: 1,
          minSymbol: 1,
        });
        message: "Password {Value is not  strong enough}";
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "password don't match",
      },
    },
    role: {
      type: String,
      enum: ["buyer", "store-manager", "admin"],
      default: "buyer",
    },
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },

    shippingAddress: String,

    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive", "blocked"],
    },

    confirmationToken: String,
    confirmationTokenExpires: Date,

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const password = this.password;
  // const hashPassword = bcrypt.hashSync(password);
  const hashedPassword = await bcrypt.hash(password, salt);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;