import express from "express";

import {
  getAllRegistre,
  getOneRegistre,
  createRegistre,
  editRegistre,
  deleteRegistre,
} from "../controller/registre.controller.js";

const registreRoutes = express.Router();
/*  */
registreRoutes.get("/registres", getAllRegistre);
registreRoutes.get("/registres/:registreId", getOneRegistre);
registreRoutes.post("/registres", createRegistre);
registreRoutes.put("/registres/:registreId", editRegistre);
registreRoutes.delete("/registres/:registreId", deleteRegistre);

export default registreRoutes;
