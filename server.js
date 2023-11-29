const express = require("express");
const cors = require('cors');
const userRoutes = require('./server/routes/user.routes.js');
const etablissementRoutes = require('./server/routes/etablissement.routes.js');
const registreRoutes = require('./server/routes/registre.routes.js');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(etablissementRoutes);
app.use(registreRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port: ${port}...`);
});
