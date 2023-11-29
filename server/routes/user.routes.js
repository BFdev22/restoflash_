const express = require("express");
const User = require("../controller/user.controller.js");

const userRoutes = express.Router();

userRoutes.get("/users", User.getAllUser);
userRoutes.get("/users/:userId", User.getOneUser);
userRoutes.post("/users", User.createUser);
userRoutes.put("/users/:userId", User.editUser);
userRoutes.delete("/users/:userId", User.deleteUser);

export default userRoutes;
