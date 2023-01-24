const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photoController");

router.post("/upload", photoController.upload);

module.exports = router;
