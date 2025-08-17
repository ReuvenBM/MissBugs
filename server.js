import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { loggerService } from "./services/logger.service.js"
import { bugRoutes } from "./api/bug/bug.routes.js"
import path from "path"
import { userRoutes } from "./api/user/user.routes.js"

const app = express()

const corsOptions = {
  origin: [
    "http://127.0.0.1:3030",
    "http://localhost:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174",
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

app.get("/cookies", (req, res) => {
  let visitCount = +req.cookies.visitCount || 0
  visitCount++

  res.cookie("visitCount", visitCount, { maxAge: 1000 * 5 })
  console.log("visitCount", visitCount)
  res.send(`<h1>Hi Puki - ${visitCount}</h1>`)
})

app.get("/*all", (req, res) => {
  res.sendFile(path.resolve("public/index.html"))
})
const port = 3030
app.listen(port, () =>
  loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)
