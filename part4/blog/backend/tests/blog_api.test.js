const mongoose = require('mongoose') 
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
//return test db to initial conditions before running any tests
beforeEach(async () => {
  await Blog.deleteMany({}) //delete all docs
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog)) //array of Blog objs
  const promiseArray = blogObjects.map(blogObj => blogObj.save()) //array of promises
  await Promise.all(promiseArray) //wait until all promises have completed
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await helper.blogsInDb()
  expect(response).toHaveLength(helper.initialBlogs.length)
})


