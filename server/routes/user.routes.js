import express from "express";
import {
  getAllUser,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
} from "../controller/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUser);
userRoutes.get("/users/:userId", getOneUser);
userRoutes.post("/users", createUser);
userRoutes.put("/users/:userId", editUser);
userRoutes.delete("/users/:userId", deleteUser);

export default userRoutes;
