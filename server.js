import express from "express"
import cors from "cors"

import { bugService } from "./services/bug.service.js"
import { loggerService } from "./services/logger.service.js"

const app = express()
app.use(express.static("public"))
app.use(express.json())

const corsOptions = {
  origin: [
    "http://127.0.0.1:3030",
    "http://localhost:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174",
  ],
  credentials: true,
}

app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send("Welcome to Express!!!")
})

app.get("/api/bug", async (req, res) => {
  const bugs = await bugService.query()
  res.send(bugs)
})

app.put("/api/bug/:id", async (req, res) => {
  try {
    const { id } = req.params
    const bugToSave = req.body
    if (!bugToSave._id || bugToSave._id !== id) {
      return res.status(400).send("id mismatch")
    }
    const savedBug = await bugService.save(bugToSave)
    res.send(savedBug)
  } catch (err) {
    loggerService.error("Failed to update bug", err)
    res.status(500).send("Failed to update bug")
  }
})

app.post("/api/bug", async (req, res) => {
  try {
    const savedBug = await bugService.save(req.body)
    res.status(201).send(savedBug)
  } catch (err) {
    loggerService.error("Failed to create bug", err)
    res.status(500).send("Failed to create bug")
  }
})

app.get("/api/bug/:id", async (req, res) => {
  const bugId = req.params.id

  try {
    const bug = await bugService.getById(bugId)
    res.send(bug)
  } catch (err) {
    loggerService.error(err)
    res.status(404).send(err)
  }
})

app.delete("/api/bug/:id", async (req, res) => {
  const bugId = req.params.id
  await bugService.remove(bugId)
  res.send("OK")
})

const port = 3030
app.listen(port, () =>
  loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)
