export function limitBugViews(req, res, next) {
  const raw = req.cookies.visitedBugs || '[]'
  let visited
  try {
    visited = JSON.parse(raw)
    if (!Array.isArray(visited)) visited = []
  } catch {
    visited = []
  }
  const { bugId } = req.params
  if (bugId && !visited.includes(bugId)) visited.push(bugId)

  console.log('User visited at the following bugs:', visited)

  if (visited.length > 3) {
    return res.status(401).send('Wait for a bit')
  }

  res.cookie('visitedBugs', JSON.stringify(visited), {
    maxAge: 7000,
    httpOnly: true,
    sameSite: 'Lax',
    path: '/'
  })

  next()
}
