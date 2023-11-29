const Etablissement = require("../model/etablissement.model.js");
const Registre = require('../model/registre.model.js');
const User = require("../model/user.model.js");

User.hasMany(Registre);
Etablissement.hasMany(User);
User.belongsTo(Etablissement);
Registre.belongsTo(User);

async function getAllRegistre(req, res) {
  try {
    const registres = await Registre.findAll({
      attributes: ["id", "quantite", "date"],
      include: [
        {
          model: User,
          attributes: ["id", "nom", "prenom"],
          required: true,
          include: [
            {
              model: Etablissement,
              attributes: ["id", "nomEtablissement"],
              required: true,
            },
          ],
        },
      ],
    });
    return res.status(200).json(registres);
  } catch (error) {
    console.log(error);
  }
}
async function getOneRegistre(req, res) {
  try {
    const registre = await Registre.findOne({
      attributes: ["id", "quantite", "date"],
      include: [
        {
          model: User,
          attributes: ["id", "nom", "prenom"],
          required: true,
          include: [
            {
              model: Etablissement,
              attributes: ["id", "nomEtablissement"],
              required: true,
            },
          ],
        },
      ],
      where: { id: req.params.registreId },
    });

    if (!registre) {
      return res.status(404).json({ message: "Ce registre n'existe pas" });
    }

    return res.status(200).json(registre);
  } catch (error) {
    console.log(error);
  }
}
async function createRegistre(req, res) {
  try {
    const registre = await Registre.create({
      quantite: req.query.quantite,
      date: req.query.date,
      userId: req.query.userId,
    });

    return res.status(200).json({ message: "Registre ajouté avec succès" });
  } catch (error) {
    console.log(error);
  }
}
async function editRegistre(req, res) {
  try {
    const registre = await Registre.update(
      {
        quantite: req.query.quantite,
        date: req.query.date,
        userId: req.query.userId,
      },
      { where: { id: req.params.registreId } }
    );

    if (!registre) {
      res.status(400).json({ message: "Ce registre n'existe pas" });
    }

    return res.status(200).json({
      message: "Le registre a bien été mis à jour..",
    });
  } catch (error) {
    console.log(error);
  }
}
async function deleteRegistre(req, res) {
  try {
    const registre = await Registre.destroy({
      where: { id: req.params.registreId },
    });

    if (!registre) {
      res.status(400).json({ message: "Ce registre n'existe pas" });
    }

    return res.status(200).json({ message: "Le registre à bien été supprimé" });
  } catch (error) {
    console.log(error);
  }
}

export {
  getAllRegistre,
  getOneRegistre,
  createRegistre,
  editRegistre,
  deleteRegistre,
};
