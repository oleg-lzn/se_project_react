const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  weather: {
    type: String,
    required: [true, "The weather type field is required."],
    enum: ["hot", "cold", "warm"],
  },
  imageUrl: {
    type: String,
    required: [true, "The imageURL field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid image URL.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, "The date field is required. "],
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
