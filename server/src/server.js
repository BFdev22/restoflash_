import express from "express";
import cors from "cors";
import userRoutes from "../routes/user.routes.js";
import etablissementRoutes from "../routes/etablissement.routes.js";
import registreRoutes from "../routes/registre.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(etablissementRoutes);
app.use(registreRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}...`);
});
