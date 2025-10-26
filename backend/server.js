import express from "express"      
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./src/routes/authRoutes.js"
import notesRoutes from "./src/routes/notesRoute.js"
import { connectDB } from "./src/config/db.js"
import rateLimiter from "./src/middleware/rateLimiter.js"

dotenv.config()

const app = express()
app.set('trust proxy', 1)
const PORT = process.env.PORT || 5001

app.use(cors(
    { origin: "http://localhost:5173" }
))
app.use(rateLimiter)
app.use(express.json())  

app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server started at PORT ${PORT}`)
    })
})
