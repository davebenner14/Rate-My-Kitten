const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  photo: { type: String, required: true },
});

module.exports = mongoose.model("Photo", photoSchema);
