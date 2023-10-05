const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.js");

router.get("/", mainController.home);
router.get("/sobre", mainController.about);
router.get("/jogar", mainController.player);
module.exports = router;