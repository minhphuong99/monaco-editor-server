const explore = require('services/explore')

const getFile = (req, res, next) => {
  try {
    explore.readFile({
      filepath: req.query.filepath,
      project: req.params.project
    }).pipe(res)
  } catch (error) {
    next(error)
  }
}

const writeFile = (req, res, next) => {
  try {
    explore.writeFile({
      filepath: req.body.filepath,
      project: req.params.project,
      content: req.body.content
    })
    res.json({
      message: "Success"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getFile,
  writeFile
}