import express from "express";

import {
  getAllRegistre,
  getOneRegistre,
  createRegistre,
  editRegistre,
  deleteRegistre,
} from "../controller/registre.controller.js";
import { verifyToken } from "../middleware/authentification.js";

const registreRoutes = express.Router();
/*  */
registreRoutes.get("/registres", verifyToken, getAllRegistre);
registreRoutes.get("/registres/:registreId", verifyToken, getOneRegistre);
registreRoutes.post("/registres", verifyToken, createRegistre);
registreRoutes.put("/registres/:registreId", verifyToken, editRegistre);
registreRoutes.delete("/registres/:registreId", verifyToken, deleteRegistre);

export default registreRoutes;
