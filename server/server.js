import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import donationRoutes from "./routes/donationRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(
cors({
origin: "*",
credentials: true,
})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
res.json({
message: "MealBridge API Running",
status: "success",
})
})

app.use("/api/auth", authRoutes)
app.use("/api/donations", donationRoutes)

app.use((req, res) => {
res.status(404).json({
message: "Route Not Found",
})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
console.log(
`🚀 MealBridge Server Running on Port ${PORT}`
)
})
