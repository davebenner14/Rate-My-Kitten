const express = require("express");
const router = express.Router();
const ratingsCtrl = require("../controllers/ratings");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.post("/kittens/:id/ratings", ensureLoggedIn, ratingsCtrl.create);

module.exports = router;
