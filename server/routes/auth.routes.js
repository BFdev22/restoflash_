import express from "express";

import { authentification } from "../middleware/authentification.js";

const authRoutes = express.Router();

authRoutes.post("/connexion", authentification);

export default authRoutes;
