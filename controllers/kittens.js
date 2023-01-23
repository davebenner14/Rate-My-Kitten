const Kitten = require("../models/kitten");
const mongoose = require("mongoose");

module.exports = {
  new: newKitten,
  create,
  index,
  show,
};

function index(req, res) {
  Kitten.find({}, function (err, kittens) {
    res.render("kittens/index", { title: "All Kittens", kittens });
  });
}

function show(req, res) {
  Kitten.findById(req.params.id);
}

function newKitten(req, res) {
  res.render("kittens/new", { title: "Add Cat" });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }

  const kitten = new Kitten(req.body);
  kitten.save(function (err) {
    if (err) return res.redirect("/kittens/new");
    console.log(kitten);
    res.redirect(`/kittens/${kitten._id}`);
  });
}
