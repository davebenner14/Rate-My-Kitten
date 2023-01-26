const Kitten = require("../models/kitten");

module.exports = {
  create,
};

function create(req, res, next) {
  Kitten.findById(req.params.id, function (err, kitten) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    if (err) return next(err);
    console.log(req.body);
    kitten.ratings.push(req.body);
    kitten.save(function (err) {
      if (err) return next(err);
      res.redirect(`/kittens/${kitten._id}`);
    });
  });
}
