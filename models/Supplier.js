const mongoose = require("mongoose");
// const validator = require("validator");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a supplier name"],
      unique: true,
      maxLength: 100,
      lowercase: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, "please provide a contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "please provide a valid phone number",
        },
      },
    ],
    emergencyContactNumber: {
      type: String,
      required: [true, "please provide a emergency number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "please provide a valid phone number",
      },
    },
    tradeLicenseNumber: {
      type: Number,
      required: [true, "please provide your license number"],
    },
    presentAddress: {
      type: String,
      required: [true, "please provide your present address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "please provide your permanent address"],
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: [
          "barishal",
          "chattogram",
          "dhaka",
          "khulna",
          "rajshahi",
          "rangpur",
          "mymensingh",
          "sylhet",
        ],
        message: "{VALUE} is not a correct division",
      },
    },
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    nationalIdImageURL: {
      type: String,
      required: true,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);
const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
