const DataTypes = require("sequelize");
const connectDB = require("../database/database.js");

const Etablissement = connectDB.define("etablissement", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomEtablissement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Etablissement;
