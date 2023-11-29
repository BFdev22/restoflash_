const express = require("express");
const Etablissement = require('../controller/etablissement.controller.js');

const etablissementRoutes = express.Router();

etablissementRoutes.get("/etablissements", Etablissement.getAllEtablissement);
etablissementRoutes.get(
  "/etablissements/:etablissementId",
  Etablissement.getOneEtablissement
);
etablissementRoutes.post("/etablissements", Etablissement.createEtablissement);
etablissementRoutes.put("/etablissements/:etablissementId", Etablissement.editEtablissement);
etablissementRoutes.delete(
  "/etablissements/:etablissementId",
  Etablissement.deleteEtablissement
);

export default etablissementRoutes;
