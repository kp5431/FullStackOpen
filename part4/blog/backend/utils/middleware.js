/***
 * This file stores custom middleware functions
 ***/

const logger = require('./logger')

/**
 * This funciton gives quick info regarding requests
 * the server recieves
**/
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('Token:', request.token)
  logger.info('---')
  next()
}

/**
 * single place to send unknown routes to
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

/**
 * Error handler for specific errors we know how to
 * handle
 */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

/**
 * This function extracts the token from the request's authorization header
 * and makes it accessible by calling request.token in future handlers
 */
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }
  else{
    request.token = null
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}