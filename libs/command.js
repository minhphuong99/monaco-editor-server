const { exec } = require('child_process');
const validate = require('./validate')

module.exports.execute = ({ command, dir }) => new Promise((resolve, reject) => {
  validate({ command, dir }, ['command', 'dir'])
  
  exec(command, { cwd: dir }, (error, stdout, stderr) => {
    if (error) {
      return stderr ? reject(stderr) : reject(error)
    }
    resolve(stdout)
  })
})