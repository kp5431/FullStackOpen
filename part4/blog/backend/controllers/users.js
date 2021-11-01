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

  //ensure user has username and password properties
  if(!body.hasOwnProperty('username') ||
       !body.hasOwnProperty('password')){
        //return so execution in route does not continue
        return response.status(400).send( //status().send() sends the status code back to client
          { 
            error: 'user from HTTP POST missing username and/or password property'
          })
  }
  
  //ensure username and pw are both at least 3 chars
  if(body.username.length < 3 || body.password.length < 3){
    return response.status(400).send( //status().send() sends the status code back to client
      { 
        error: 'username and password properties must be at least 3 characters'
      })
  }
  
  //valid user submitted
  const saltRounds = 10 //create a hash of the pw submitted
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)


})

module.exports = usersRouter