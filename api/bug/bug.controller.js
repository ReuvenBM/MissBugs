import { loggerService } from "../../services/logger.service.js"
import { bugService } from "./bug.service.js"


export async function getBugs(req, res) {
    const { txt, severity, pageIdx } = req.query
    const filterBy = {
        txt,
        severity: +severity,
    }

    if (pageIdx) filterBy.pageIdx = +pageIdx

    try {
        const bugs = await bugService.query(filterBy)
        res.send(bugs)
    } catch (err) {
        loggerService.error('Cannot get bugs', err)
        res.status(400).send('Cannot get bugs')
    }
}

export async function getBug(req, res) {
    const { bugId } = req.params
    try {
        const bug = await bugService.getById(bugId)
        res.send(bug)
    } catch (err) {
        loggerService.error('Cannot get bug', err)
        res.status(400).send('Cannot get bug')
    }
}

export async function addBug(req, res) {
    const { _id, title, severity } = req.body
    const bugToSave = { _id, title, severity: +severity }
    try {
        const savedbug = await bugService.save(bugToSave)
        res.send(savedbug)
    } catch (err) {
        loggerService.error('Cannot save bug', err)
        res.status(400).send('Cannot save bug')
    }
}

export async function updateBug(req, res) {
    const { _id, title, severity } = req.body
    const bugToSave = { _id, title, severity: +severity }
    try {
        const savedBug = await bugService.save(bugToSave)
        res.send(savedBug)
    } catch (err) {
        loggerService.error('Cannot save bug', err)
        res.status(400).send('Cannot save bug')
    }
}

export async function removeBug(req, res) {
    const { bugId } = req.params
    try {
        await bugService.remove(bugId)
        res.send('Bug Deleted')
    } catch (err) {
        loggerService.error('Cannot remove bug', err)
        res.status(400).send('Cannot remove bug')
    }
}

