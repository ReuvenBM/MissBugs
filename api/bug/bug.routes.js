import express from "express"
import { addBug, getBugs, getBug, removeBug, updateBug } from "./bug.controller.js"
import { limitBugViews } from "./bug.middleware.js"

const router = express.Router()


router.get('/', getBugs)
router.get('/:bugId', limitBugViews, getBug)
router.put('/:bugId', updateBug)
router.post('/', addBug)
router.delete('/:bugId', removeBug)



export const bugRoutes = router