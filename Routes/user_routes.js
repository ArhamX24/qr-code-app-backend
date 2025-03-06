import express from "express";
import { registerUser, login } from "../Controllers/User_Controllers.js";

let UserRouter = express.Router()

UserRouter.post("/register", registerUser)
.post("/login", login)

export default UserRouter