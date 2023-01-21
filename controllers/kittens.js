const Kitten = require("../models/kitten");

module.exports = {
  new: newKitten,
};

function newKitten(req, res) {
  res.render("kittens/new");
}
