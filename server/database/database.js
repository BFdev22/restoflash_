import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const connectDB = new Sequelize(
  /* "restoflash",
  "root",
  "", */
  'restoflash',
  'root',
  '',
  {
    host: "localhost",
    dialect: "mysql",
  }
);

try{
  connectDB.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch(error){
  console.error('Impossible de se connecter, erreur suivante :', error);
}

export default connectDB;
