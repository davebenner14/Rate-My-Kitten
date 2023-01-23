const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const kittenSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Unknown"],
  },
  breed: {
    type: String,
    enum: [
      "Persian",
      "Maine Coon",
      "Ragdoll",
      "Siamese",
      "British Shorthair",
      "Exotic Shorthair",
      "Abyssinian",
      "Tonkinese",
      "Russian Blue",
      "Bengal",
      "Scottish Fold",
      "Siberian",
      "Birman",
      "Himalayan",
      "Nebelung",
      "Norwegian Forest",
      "Bombay",
      "Burmese",
      "Chartreux",
      "American Shorthair",
      "Mutt",
      "Other",
    ],
  },
  bio: {
    type: String,
  },
  ratings: [ratingSchema],

  review: [reviewSchema],
});

module.exports = mongoose.model("Kitten", kittenSchema);
