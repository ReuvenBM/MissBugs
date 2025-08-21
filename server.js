import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import { loggerService } from "./services/logger.service.js"
import { bugRoutes } from "./api/bug/bug.routes.js"
import { userRoutes } from "./api/user/user.routes.js"
import { authRoutes } from "./api/auth/auth.routes.js"

const app = express()

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:3030",
  ],
  credentials: true,
}

//* Express Config
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))
app.set("query parser", "extended")

//* Routes
app.use("/api/bug", bugRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)


app.get("/*all", (req, res) => {
  res.sendFile(path.resolve("public/index.html"))
})
const port = 3030
app.listen(port, () =>
  loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)
