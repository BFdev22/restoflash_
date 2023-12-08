import Etablissement from "../model/etablissement.model.js";
import Registre from "../model/registre.model.js";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";

User.hasMany(Registre);
Etablissement.hasMany(User);
User.belongsTo(Etablissement);
Registre.belongsTo(User);

async function getAllUser(req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "nom", "prenom", "email", "password", "role"],
      include: [
        {
          model: Etablissement,
          attributes: ["id", "nomEtablissement"],
          required: false,
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log("getAllUser: ", error);
  }
}
async function getOneUser(req, res) {
  try {
    const user = await User.findOne({
      attributes: ["id", "nom", "prenom", "email", "password", "role"],
      include: [
        {
          model: Etablissement,
          attributes: ["id", "nomEtablissement"],
          required: false,
        },
      ],
      where: { id: req.params.userId },
    });

    if (!user) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("getOneUser: ", error);
  }
}
async function createUser(req, res) {
  try {
    const saltRounds = 10;
    /*  */
    /* if (!req.query.name && !req.query.email && !req.query.password) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    } */

    const addUser = User.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, saltRounds),
      role: req.body.role,
      etablissementId: req.body.etablissementId,
    });

    return res.status(200).json({ message: "Utilisateur ajouté avec succès" });
  } catch (error) {
    console.log("createUser: ", error);
  }
}
async function editUser(req, res) {
  try {
    const saltRounds = 10;
    /*  */
    const editUser = await User.update(
      {
        nom: req.query.nom,
        prenom: req.query.prenom,
        email: req.query.email,
        password: await bcrypt.hash(req.query.password, saltRounds),
        role: req.query.role,
        etablissementId: req.query.etablissementId,
      },
      { where: { id: req.params.userId } }
    );

    if (!editUser) {
      res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }

    return res.status(200).json({
      message: "L'utilisateur a bien été mis à jour..",
    });
  } catch (error) {
    console.log("editUser: ", error);
  }
}
async function deleteUser(req, res) {
  try {
    const deleteUser = await User.destroy({ where: { id: req.params.userId } });

    if (!deleteUser) {
      res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }

    return res
      .status(200)
      .json({ message: "L'utilisateur à bien été supprimé" });
  } catch (error) {
    console.log("deleteUser: ", error);
  }
}

export { getAllUser, getOneUser, createUser, editUser, deleteUser };
