const path = require('path')
const { command } = require('libs')

const execute = (req, res, next) => {
  command.execute({
    command: req.body.command,
    dir: path.join(process.env.WORKSPACE, req.params.project)
  }).then(stdout => res.json({ stdout }))
    .catch(stderr => res.json({ stderr }))
}

module.exports = {
  execute
}