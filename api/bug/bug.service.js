import { loggerService } from "../../services/logger.service.js"
import { makeId, readJsonFile, writeJsonFile } from "../../services/util.service.js"

const bugs = readJsonFile("./data/bug.json")

const PAGE_SIZE = 4

export const bugService = {
  query,
  getById,
  remove,
  save,
}

async function query(filterBy) {
    let bugsToDisplay = bugs
    try {
        if (filterBy.txt) {//not working yet
            const regExp = new RegExp(filterBy.txt, 'i')
            bugsToDisplay = bugsToDisplay.filter(bug => regExp.test(bug.title))
        }

        if (filterBy.severity) {
            bugsToDisplay = bugsToDisplay.filter(bug => bug.severity >= filterBy.severity)
        }

        if ('pageIdx' in filterBy) {
            const startIdx = filterBy.pageIdx * PAGE_SIZE // 0
            bugsToDisplay = bugsToDisplay.slice(startIdx, startIdx + PAGE_SIZE)
        }

        return bugsToDisplay
    } catch (err) {
        throw err
    }
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
