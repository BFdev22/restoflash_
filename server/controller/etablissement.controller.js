const Etablissement = require("../model/etablissement.model.js");
const Registre = require("../model/registre.model.js");
const User = require("../model/user.model.js");

async function getAllEtablissement(req, res) {
  try {
    const etablissements = await Etablissement.findAll({});
    return res.status(200).json(etablissements);
  } catch (error) {
    console.log("getAllEtablissement: ", error);
  }
}
async function getOneEtablissement(req, res) {
  try {
    const etablissement = await Etablissement.findByPk(
      req.params.etablissementId
    );
    return res.status(200).json(etablissement);
  } catch (error) {
    console.log("getOneEtablissement: ", error);
  }
}
async function createEtablissement(req, res) {
  try {
    const etablissement = await Etablissement.create({
      nomEtablissement: req.query.nomEtablissement,
    });

    return res
      .status(200)
      .json({ message: "Etablissement ajouté avec succès" });
  } catch (error) {
    console.log("createEtablissement: ", error);
  }
}
async function editEtablissement(req, res) {
  try {
    const etablissement = await Etablissement.update(
      {
        nomEtablissement: req.query.nomEtablissement,
      },
      { where: { id: req.params.etablissementId } }
    );

    if (!etablissement) {
      res.status(400).json({ message: "Cet etablissement n'existe pas" });
    }

    return res.status(200).json({
      message: "L'etablissement a bien été mis à jour..",
    });
  } catch (error) {
    console.log("editEtablissement: ", error);
  }
}
async function deleteEtablissement(req, res) {
  try {
    const etablissement = await Etablissement.destroy({
      where: { id: req.params.etablissementId },
    });

    if (!etablissement) {
      res.status(400).json({ message: "Cet etablissement n'existe pas" });
    }

    return res
      .status(200)
      .json({ message: "L'etablissement à bien été supprimé" });
  } catch (error) {
    console.log("deleteEtablissement: ", error);
  }
}

export {
  getAllEtablissement,
  getOneEtablissement,
  createEtablissement,
  editEtablissement,
  deleteEtablissement,
};
