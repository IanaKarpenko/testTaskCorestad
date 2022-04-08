const express = require("express");
const {validation, controlslWrapper} = require("../../middlewares");
const {userJoiSchema} = require("../../models/user");
const {register, login} = require("../../controllers/user");

const userRouter = express.Router();

//TODO routes

userRouter.post("/register", validation(userJoiSchema), controlslWrapper(register));

userRouter.post("/login", validation(userJoiSchema), controlslWrapper(login));


module.exports = userRouter;