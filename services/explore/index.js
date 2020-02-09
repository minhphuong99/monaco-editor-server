const fs = require('fs');
const path = require('path');
const { validate } = require('libs')

const readDir = ({ pathDir }) => new Promise((resolve, reject) => {
  validate.isExist({ project }, ['project'])

  fs.readdir(path.join(process.env.WORKSPACE, `/${pathDir}`), (err, files) => {
    if (err) {
      return reject(err)
    }
    resolve(
      files.map(file => ({
        isFolder: fs.statSync(path.join(process.env.WORKSPACE, `/${pathDir}/${file}`)).isDirectory(),
        name: file
      }))
    )
  })
})

const readFile = ({ filepath, project }) => {
  validate.isExist({ filepath, project }, ['filepath', 'project'])

  try {
    return fs.createReadStream(path.join(process.env.WORKSPACE, `/${project}/${filepath}`))
  } catch (error) {
    throw new Error("400:" + error.message)
  }
}

const writeFile = ({ filepath, content, project }) => {
  validate.isExist({ filepath, project, content }, ['filepath', 'project', 'content']);

  try {
    fs.createWriteStream(path.join(process.env.WORKSPACE, `/${project}/${filepath}`))
      .write(content)
  } catch (error) {
    throw new Error("400:" + error.message)
  }
}

const createDir = ({ pathDir, project }) => {
  validate.isExist({ project }, ['project']);
  try {
    fs.mkdirSync(path.join(process.env.WORKSPACE, `/${project}/${pathDir || ""}`));
    return (pathDir || project)
  } catch (error) {
    throw new Error("400:" + error.message)
  }
}

module.exports = {
  readDir,
  readFile,
  writeFile,
  createDir,
}