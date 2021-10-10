/***
 * This file sets up the App by connecting to the db
 * and then setting up the order of middleware functions
 * every request goes through 
***/

//configs such as db url and port to run server on
const config = require('./utils/config')

//web application framework
const express = require('express')
require('express-async-errors') //don't have to wrap awaits in try catch blocks in route handler
const app = express()

// ?? :(
const cors = require('cors')

//set of routes to do with CRUD operations on blog documents
const blogRouter = require('./controllers/blogs')

//set of custom middleware functions
const middleware = require('./utils/middleware')

//custom logger
const logger = require('./utils/logger')

//interface / abstraction layer for dealing with MongoDB
const mongoose = require('mongoose')

//connect to the db
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) => logger.error('error connecting to MongoDB:', error.message))

//below is the order of middleware the requests go through
app.use(cors())
app.use(express.static('build')) // ??
app.use(express.json()) // ??
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app