const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.js");
const areaController = require("../controllers/area");
const cursoController = require('../controllers/curso');
const loginController = require("../controllers/login.js");

router.post("/authenticate", loginController.authenticate);
router.get("/login", loginController.login);
router.get("/", mainController.home);
router.get("/sobre", mainController.about);
router.get("/jogar", mainController.player);
router.get("/area", areaController.index);

// CursoController
router.get('/curso' , cursoController.index);
router.get('/curso/read/:id' , cursoController.read);
router.get('/curso/create' , cursoController.create);
router.post('/curso/create' , cursoController.create);
router.get('/curso/update/:id' , cursoController.update);
router.post('/curso/update/:id' , cursoController.update);
router.post('/curso/remove/:id' , cursoController.remove);

module.exports = router;