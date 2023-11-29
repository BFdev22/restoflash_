const express = require("express");
const Registre = require('../controller/registre.controller.js');

const registreRoutes = express.Router();
/*  */
registreRoutes.get("/registres", Registre.getAllRegistre);
registreRoutes.get("/registres/:registreId", Registre.getOneRegistre);
registreRoutes.post("/registres", Registre.createRegistre);
registreRoutes.put("/registres/:registreId", Registre.editRegistre);
registreRoutes.delete("/registres/:registreId", Registre.deleteRegistre);

export default registreRoutes;
