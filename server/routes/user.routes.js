import express from "express";
import {
  getAllUser,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/authentification.js";

const userRoutes = express.Router();

userRoutes.get("/users", verifyToken, getAllUser);
userRoutes.get("/users/:userId", verifyToken, getOneUser);
userRoutes.post("/users", createUser);
userRoutes.put("/users/:userId", verifyToken, editUser);
userRoutes.delete("/users/:userId", verifyToken, deleteUser);

export default userRoutes;
