import express from "express"

import {
  registerUser,
  loginUser,
  getPlatformStats,
} from "../controllers/authController.js"

const router =
  express.Router()

router.post(
  "/register",
  registerUser
)

router.post(
  "/login",
  loginUser
)

router.get(
  "/stats",
  getPlatformStats
)

export default router