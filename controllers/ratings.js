const Kitten = require("../models/kitten");

module.exports = {
  create,
  delete: deleteRating,
};

function deleteRating(req, res, next) {
  Kitten.findOne({
    "ratings._id": req.params.id,
    "ratings.user": req.user._id,
  }).then(function (kitten) {
    if (!kitten) return res.redirect("/kittens");
    kitten.rating.remove(req.params.id);
    kitten
      .save()
      .then(function () {
        res.redirect(`/kittens/${kitten._id}`);
      })
      .catch(function (err) {
        return next(err);
      });
  });
}

function create(req, res) {
  Kitten.findById(req.params.id, function (err, kitten) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    kitten.rating.push(req.body);
    kitten.save(function (err) {
      res.redirect(`/kittens/${kitten._id}`);
    });
  });
}
