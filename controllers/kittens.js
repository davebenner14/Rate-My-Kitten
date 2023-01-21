const kitten = require("../models/kitten");
const Kitten = require("../models/kitten");

module.exports = {
  new: newKitten,
  create,
  index,
  show,
};

function index(req, res) {
  Kitten.find({}, function (err, kittens) {
    res.render("kittens/index", { title: "All Kitens", kittens });
    // ************************** ^ this might need to be changed to "name"
  });
}

// function show(req, res) {
//     Kitten.findById(req.params.id)
// }

function newKitten(req, res) {
  res.render("kittens/new", { title: "Add Cat" });
  //   ************************** ^ might need to be changed to "name"
}

function create(req, res) {
  if (err) return res.render("kittens/new");
  console.log(movies);
  res.redirect("kittens/new");
}

const kitten = new Kitten(req.body);
kitten.save(function (err) {
  if (err) return res.redirect("/kittens/new");
  console.log(kitten);
  res.redirect(`/kittens/${kitten._id}`);
});
