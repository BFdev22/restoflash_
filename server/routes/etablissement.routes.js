import express from "express";
import {
  getAllEtablissement,
  getOneEtablissement,
  createEtablissement,
  editEtablissement,
  deleteEtablissement,
} from "../controller/etablissement.controller.js";

const etablissementRoutes = express.Router();

etablissementRoutes.get("/etablissements", getAllEtablissement);
etablissementRoutes.get(
  "/etablissements/:etablissementId",
  getOneEtablissement
);
etablissementRoutes.post("/etablissements", createEtablissement);
etablissementRoutes.put("/etablissements/:etablissementId", editEtablissement);
etablissementRoutes.delete(
  "/etablissements/:etablissementId",
  deleteEtablissement
);

export default etablissementRoutes;
