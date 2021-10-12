/**
 * This file provides routes to create a new user and get information
 * about a user from the db
 */

 const bcrypt = require('bcrypt')
 const usersRouter = require('express').Router()
 const User = require('../models/user')

 /**
  * This route returns a list of all users and adds information about
  * their blogs with the populate() method
  */
 usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}) //find all users
    .populate('blogs', {title: 1, url: 1, likes: 1}) //for each user, replace the blogs fields (originally a reference to blog document) 
                       //with the title, url, and likes of the actual blog document 
    response.json(users.map(user => user.toJSON()))})

/**
 * Route for creating a new user and storing that info in the db
 */
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10 //create a hash of the pw submitted
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter