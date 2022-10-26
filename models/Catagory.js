const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const categorySchema =
  ({
    name: {
      type: String,
      required: [true, "please provide a category name"],
      location: true,
      trim: true,
      unique: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
  },
  { timestamps: true });
const Category = mongoose.createModel("Category", categorySchema);
module.exports = Category;
