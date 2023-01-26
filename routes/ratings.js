const express = require("express");
const router = express.Router();
const ratingsCtrl = require("../controllers/ratings");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// All routes "starts with" / (root)

// POST /movies/:id/reviews
router.post("/kittens/:id/ratings", ensureLoggedIn, ratingsCtrl.create);
// DELETE /reviews/:id
// router.delete("/ratings/:id", ensureLoggedIn, ratingsCtrl.delete);

module.exports = router;
