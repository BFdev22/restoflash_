const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");

const connectDB = new Sequelize(
  /* "restoflash",
  "root",
  "", */
  `${process.env.DB_NAME}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default connectDB;
