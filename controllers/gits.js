const git = require('services/git')

const status = (req, res, next) => {
  git.status({
    project: req.params.project
  }).then(status => res.json(status))
    .catch(err => next(err))
}

const showHead = (req, res, next) => {
  git.showHead({
    project: req.params.project,
    filepath: req.query.filepath
  }).then(content => res.json(content))
    .catch(err => next(err))
}

module.exports = {
  status,
  showHead
}