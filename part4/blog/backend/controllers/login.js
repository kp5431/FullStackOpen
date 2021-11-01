const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') //encryption lob
const loginRouter = require('express').Router()
const User = require('../models/user')


/**
 * Called when a user attempts to login on the frontend
 */
loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    //compare pw hashes if user exists
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60}) //token is good for 1 hour

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter