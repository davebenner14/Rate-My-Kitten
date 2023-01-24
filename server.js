var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
const multer = require("multer");

// upload photo
// const multer = require("multer");
// const upload = multer({
//   dest: "uploads/",
//   fileFilter: (req, file, cb) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return cb(new Error("Only image files are allowed!"));
//     }
//     cb(undefined, true);
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

require("dotenv").config();
require("./config/database");
require("./config/passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var kittensRouter = require("./routes/kittens");
var reviewsRouter = require("./routes/reviews");
var ratingsRouter = require("./routes/reviews");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// add photos
app.use(multer({}).single("photo"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUnititialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/kittens", kittensRouter);
app.use("/", reviewsRouter);
app.use("/", ratingsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
