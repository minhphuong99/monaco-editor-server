const explore = require('services/explore')

const readDir = (req, res, next) => {
  explore.readDir({
    pathDir: req.params.project + (req.query.path || ""),
  }).then(dirs => res.json(dirs))
    .catch(err => next(err))
}

const createDir = (req, res, next) => {
  try {
    const dirName = explore.createDir({
      project: req.body.project,
      pathDir: req.body.pathDir
    })
    res.json({
      message: "Success",
      dirName
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  readDir,
  createDir
}