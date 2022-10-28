const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const StockSchema = mongoose.Schema(
  {
    ProductId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand name"],
      maxLength: [100, "Name is to large"],
      minLength: [100, "Name must be at least 3 characters"],
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
    imageUrls: [validator.isURL, "Please provide a valid  image urls"],
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product  quantity can't be negative"],
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name"],
        lowercase: true,
        enum: {
          values: [
            "Barishal",
            "Chattogram",
            "Dhaka",
            "Khulna",
            "Rajshahi",
            "Rangpur",
            "Mymensingh",
            "Sylhet",
          ],
          massage: "{Value} is not a valid name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide  a supplier name"],
      },
      id: { type: ObjectId, ref: "Supplier" },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timeStamps: true }
);
const Stock = mongoose.model("Stock", StockSchema);
exports = Stock;
