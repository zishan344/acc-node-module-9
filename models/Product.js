const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand name"],
      maxLength: [100, "Name is to large"],
      minLength: [3, "Name must be at least 3 characters"],
      unique: true,
      maxLength: 100,
      lowercase: true,
    },
    description: { type: String, required: true },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        messages: ["unit value can't be {VALUE}, must be  kg/liter/pcs/bag"],
      },
    },
    imageURLs: [
      {
        type: String,
        require: true,
        validate: [validator.isURL, "Please provide a valid  image urls"],
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: { type: String, required: true },

      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  { timeStamps: true }
);
ProductSchema.pre("save", function (next) {
  // this
  console.log("Before saving data");
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
