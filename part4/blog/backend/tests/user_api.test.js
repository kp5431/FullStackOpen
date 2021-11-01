/**
 * This file tests the user route
 */

const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

//delete all users in the db first
beforeEach(async () => {
  await User.deleteMany({})
})

test('Add a new user to the db', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'testUser',
    name: 'Test User',
    password: 'password',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const jsonResponse = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(jsonResponse.body).toHaveLength(usersAtStart.length + 1)
  const usernames = jsonResponse.body.map(userObj => userObj.username)
  expect(usernames).toContain(newUser.username)

})

test('Add 3 users, get from db, then print', async () => {
  const hardcodedUsers = helper.users
  
  for await (const user of hardcodedUsers){
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  }

  const response = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(hardcodedUsers.length)
  const hardcodedUsernames = hardcodedUsers.map(u => u.username)
  const dbUsernames = response.body.map(u => u.username)
  for(const username of hardcodedUsernames){
    expect(dbUsernames).toContain(username)
  }

  response.body.forEach(user => console.log(user))


})

test('Invalid users are not submitted to db', async () => {
  const validUser = {
    username: 'validUser',
    name: 'validUser',
    password: 'password',
  }
  
  const invalidUsers = [
    {
      //missing username
      name: 'Bad User',
      password: 'password',
    },
    {
      username: 'badUser',
      name: 'Bad User',
      //missing password
    },
    {
      //missing usernam
      name: 'Bad User',
      //missing password
    },
    {
      username: 'Be', //must be at least 3 chars
      name: 'Bad User',
      password: 'password',
    },
    {
      username: 'testUser',
      name: 'Bad User',
      password: 'pa', //3 chars
    },
    {
      username: 'Te', //3 chars
      name: 'Bad User',
      password: 'pas', //3 chars
    },
    {
      username: 'validUser', //username taken
      name: 'validUser',
      password: 'password',
    }
  ]

  //submit the valid user
  await api
    .post('/api/users')
    .send(validUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  //submit invalid users, expecting each to fail
  for await (const user of invalidUsers){
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  }
  
  //ensure only the valid user exists in the db
  const jsonResponse = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(jsonResponse.body).toHaveLength(1)
  const usernames = jsonResponse.body.map(userObj => userObj.username)
  expect(usernames[0]).toBe(validUser.username)

  //ensure responses received for specific errors are correct
  const missingProperty = invalidUsers[0]
  const tooShort = invalidUsers[4]
  const notUnique = invalidUsers[6]

  const missingPropertyResponse = await api
    .post('/api/users')
    .send(missingProperty)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(missingPropertyResponse.body.error).toContain('user from HTTP POST missing username and/or password property')

  const tooShortResponse = await api
    .post('/api/users')
    .send(tooShort)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(tooShortResponse.body.error).toContain('username and password properties must be at least 3 characters')

  const notUniqueResponse = await api
    .post('/api/users')
    .send(notUnique)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(notUniqueResponse.body.error).toContain('validation failed')

  

})

afterAll(() => {
  mongoose.connection.close()
})