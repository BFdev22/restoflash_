import express from "express";
import {
  getAllEtablissement,
  getOneEtablissement,
  createEtablissement,
  editEtablissement,
  deleteEtablissement,
} from "../controller/etablissement.controller.js";
import { verifyToken } from "../middleware/authentification.js";

const etablissementRoutes = express.Router();

etablissementRoutes.get("/etablissements", verifyToken, getAllEtablissement);
etablissementRoutes.get(
  "/etablissements/:etablissementId",
  verifyToken,
  getOneEtablissement
);
etablissementRoutes.post("/etablissements", verifyToken, createEtablissement);
etablissementRoutes.put(
  "/etablissements/:etablissementId",
  verifyToken,
  editEtablissement
);
etablissementRoutes.delete(
  "/etablissements/:etablissementId",
  verifyToken,
  deleteEtablissement
);

export default etablissementRoutes;
