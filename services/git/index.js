const path = require('path')
const { command, validate } = require('libs');

/**   
 * 
 * @typedef {Object} Status
 * @property {String} Status.code
 * @property {String} Status.name
 * @property {String} Status.parentFolder
 * 
 * @param {Object} object
 * @param {String} object.project name project
 * @returns {Promise<Status>}
 */
const status = ({ project }) => {
  validate.isExist({ project }, ['project'])

  return command.execute({
    command: "git status -z -u",
    dir: path.join(process.env.WORKSPACE, `${process.env.WORKSPACE}${project}`)
  }).then(stdout => stdout
    .split("\u0000")
    .filter(data => data.trim() !== "")
    .map(data => {
      const status = data.split(" ")
      const filepath = status.pop().split("/");
      return {
        status: status.join("") === "??" ? "U" : status.join(""),
        name: filepath.pop(),
        parentFolder: filepath.join("/")
      }
    }))
    .catch(err => {
      console.log(err)
      throw new Error("400:Can not check status!")
    })
}

/**   
 * 
 * @param {Object} object
 * @param {String} object.filepath
 * @param {String} object.project name project
 * @returns {Promise<String>} content file
 */
const showHead = async ({ filepath, project }) => {
  validate.isExist({ filepath, project }, ['filepath', 'project'])

  try {
    const content = await command.execute({
      command: `git show HEAD:${filepath}`,
      dir: path.join(process.env.WORKSPACE, `${process.env.WORKSPACE}${project}`)
    })
    return { content }
  } catch (error) {
    console.log(error)
    if (error.message.includes("exists on disk")) {
      return { content: "" }
    }
    throw new Error("400:Get content error")
  }
}

module.exports = {
  status,
  showHead
}