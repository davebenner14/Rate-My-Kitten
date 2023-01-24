const multer = require("multer");
const Photo = require("../models/photo");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

exports.upload = (req, res, next) => {
  upload.single("photo")(req, res, function (err) {
    if (err) {
      return res.send(err);
    }
    const newPhoto = new Photo({
      photo: req.file.path,
    });
    newPhoto
      .save()
      .then((result) => {
        console.log(result);
        // res.redirect("/");
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
