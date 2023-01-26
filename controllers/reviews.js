const Kitten = require("../models/kitten");

module.exports = {
  create,
  delete: deleteReview,
};

function deleteReview(req, res, next) {
  Kitten.findOne({
    "reviews._id": req.params.id,
    "reviews.user": req.user._id,
  }).then(function (kitten) {
    if (!kitten) return res.redirect("/kittens");
    kitten.reviews.remove(req.params.id);
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
function create(req, res, next) {
  Kitten.findById(req.params.id, function (err, kitten) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    if (err) return next(err);
    console.log(req.body);
    kitten.reviews.push(req.body);
    kitten.save(function (err) {
      if (err) return next(err);
      res.redirect(`/kittens/${kitten._id}`);
    });
  });
}
