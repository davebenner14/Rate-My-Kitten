const Kitten = require("../models/kitten");
const mongoose = require("mongoose");
const Photo = require("../models/photo");

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
  Kitten.findById(req.params.id).exec(function (err, kitten) {
    res.render("kittens/show", {
      title: "Kitten Detail",
      kitten,
    });
  });
}

function newKitten(req, res) {
  res.render("kittens/new", { title: "Add Cat" });
}

function create(req, res, next) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  let pathArr = req.file.path.split("/");
  pathArr.shift();
  req.body.photo = "/" + pathArr.join("/");
  console.log("this is the file", req.file.path);

  const kitten = new Kitten(req.body);
  kitten.save(function (err) {
    if (err) return next(err);
    console.log(kitten);
    res.redirect(`/kittens/${kitten._id}`);
  });
}
