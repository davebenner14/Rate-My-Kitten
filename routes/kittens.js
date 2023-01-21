const express = require("express");
const router = express.Router();
const ensureloggedIn = require("../config/ensureLoggedIn");

router.get("/", kittensCtrl.index);
