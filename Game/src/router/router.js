const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.js");
const areaController = require("../controllers/area");
const cursoController = require('../controllers/curso');
const loginController = require("../controllers/login.js");
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

router.get("/login", loginController.login);
router.get("/singup", loginController.singup);
router.get("/logout", loginController.logout);
router.post("/singup", loginController.singup);

router.post("/login", loginController.authenticate);
router.get("/sobre", mainController.about);
router.get("/",ensureAuthenticated, mainController.home);
router.get("/jogar", ensureAuthenticated, mainController.player);
router.get("/area",ensureAuthenticated, areaController.index);

// CursoController
router.get('/curso' ,ensureAuthenticated, cursoController.index);
router.get('/curso/read/:id' ,ensureAuthenticated, cursoController.read);
router.get('/curso/create' ,ensureAuthenticated, cursoController.create);
router.post('/curso/create' ,ensureAuthenticated, cursoController.create);
router.get('/curso/update/:id' ,ensureAuthenticated, cursoController.update);
router.post('/curso/update/:id' ,ensureAuthenticated, cursoController.update);
router.get('/curso/remove/:id' ,ensureAuthenticated, cursoController.remove);

module.exports = router;