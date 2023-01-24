const express = require("express");
const router = express.Router();
const path = require("path");
const kittensCtrl = require("../controllers/kittens");
const ensureloggedIn = require("../config/ensureLoggedIn");
// const photo = require("../controllers/photos");

const multer = require("multer");
const upload = multer({ dest: "../uploads" });

router.get("/", kittensCtrl.index);
router.get("/new", ensureloggedIn, kittensCtrl.new);
router.get("/:id", kittensCtrl.show);
router.post("/", ensureloggedIn, upload.single("photo"), kittensCtrl.create);

module.exports = router;
