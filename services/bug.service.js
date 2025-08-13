import { loggerService } from "./logger.service.js"
import { makeId, readJsonFile, writeJsonFile } from "./util.service.js"

const bugs = readJsonFile("./data/bug.json")

export const bugService = {
  query,
  getById,
  remove,
  save,
}

async function query() {
  return bugs
}

async function getById(bugId) {
  const bug = bugs.find((bug) => bug._id === bugId)

  if (!bug) {
    loggerService.error(`Couldn't find bug with _id ${bugId}`)
    throw `Couldn't get bug`
  }
  return bug
}

async function remove(bugId) {
  const idx = bugs.findIndex((bug) => bug._id === bugId)
  if (idx === -1) throw new Error(`Bug ${bugId} not found`)
  bugs.splice(idx, 1)
  return _savebugs()
}

async function save(bugToSave) {
  if (bugToSave._id) {
    const idx = bugs.findIndex((bug) => bug._id === bugToSave._id)
    if (idx === -1) throw new Error(`Bug ${bugToSave._id} not found`)
    bugs.splice(idx, 1, bugToSave)
  } else {
    bugToSave._id = makeId()
    bugs.push(bugToSave)
  }
  await _savebugs()
  return bugToSave
}

function _savebugs() {
  return writeJsonFile("./data/bug.json", bugs)
}
