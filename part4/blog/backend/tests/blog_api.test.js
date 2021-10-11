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

test('ensure id field is present, not _id', async () => {
  const response = await helper.blogsInDb()
  response.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'blog 3',
    author: 'a3',
    url: 'u3',
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
})


