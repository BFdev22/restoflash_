import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";

import * as dotenv from "dotenv";
dotenv.config();
/*  */
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe :', error);
  }
}

async function authentification(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      const hashPass = await hashPassword(password);
      
      const response = await bcrypt.compare(password, user.password);
      if (response) {
        //delete user._doc.password;

        const token = jwt.sign(
          {
            user: user,
          },
          SECRET_KEY,
          {
            expiresIn: process.env.JWT_EXPIRE,
          }
        );

        res.header("Authorization", "Bearer " + token);

        return res
          .status(200)
          .json({ 
            token: token, 
            message: "Vous êtes bien connecté",
            userid: user.id, 
            username: user.nom + " " + user.prenom
          });
      } else {
        return res
          .status(403)
          .json({ message: "Email ou mot de passe incorrect" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error);
    return res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'authentification" });
  }
}


async function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Accès refusé.");
  }

  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Accès refusé." });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Accès refusé." });
  }
}

export { authentification, verifyToken };
