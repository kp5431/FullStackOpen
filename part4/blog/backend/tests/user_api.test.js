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
    .expect(200)
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
      .expect(200)
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

afterAll(() => {
  mongoose.connection.close()
})