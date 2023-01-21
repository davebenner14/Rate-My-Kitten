const express = require("express");
const router = express.Router();
const ensureloggedIn = require("../config/ensureLoggedIn");
const kittensCtrl = require("../controllers/kittens");

router.get("/", kittensCtrl.index);
router.get("/new", ensureloggedIn, kittensCtrl.new);
router.get("/:id", kittensCtrl.show);
router.post("/", ensureloggedIn, kittensCtrl.create);

module.exports = router;
