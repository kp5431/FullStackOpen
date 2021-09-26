/***
 * This config file sets up the url of the database
 * and port to run on. It gets these values from the
 * environment variables
 ***/

require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}