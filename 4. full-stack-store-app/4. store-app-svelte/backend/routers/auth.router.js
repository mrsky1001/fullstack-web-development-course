const express = require("express")
const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

// localhost:3000/auth/*
authRouter.post("/login", authController.login)
authRouter.post("/registration", authController.registration)


module.exports = authRouter