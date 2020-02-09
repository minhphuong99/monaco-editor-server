require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const path = require('path');

const indexRoute = require('./controllers');
const app = express();

module.exports = app
  .use(logger('tiny'))
  .use(express.static(path.join(__dirname + '/publics'), {
    setHeaders: (res, path, stat) => {
      res.setHeader("Cache-Control", "public, max-age=5000")
    }
  }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/api', indexRoute)
  .use((req, res, next) => {
    next(createError(404))
  })
  .use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500)
      .json(createError(...error.message.split(":").map(value => !Number(value) ? value : Number(value))));
  });