const Router = require('express').Router;
const fileController = require('./files')

const rootRouter = Router();

const fileRouter = () => Router()
  .get("/:project", fileController.getFile)
  .post("/:project/write", fileController.writeFile)

const dirRouter = () => Router()
  .get("/:project", (req, res) => { res.send("Ok") })
  .post("/", (req, res) => { res.send("Ok") })

const gitRouter = () => Router()
  .get("/:project/status", (req, res) => { res.send("Ok") })
  .get("/:project/show-head", (req, res) => { res.send("Ok") })

const commandRouter = () => Router()
  .post("/:project", (req, res) => { res.send("Ok") })

module.exports = rootRouter
  .use("/files", fileRouter())
  .use("/dirs", dirRouter())
  .use("/gits", gitRouter())
  .use("/commands", commandRouter())