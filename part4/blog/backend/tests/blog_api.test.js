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

test('like property defaults to 0 if likes field missing from post', async () => {
  const newBlog = {
    title: 'blog 3',
    author: 'a3',
    url: 'u3'
    //missing likes field
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const dbNewBlog = blogsAtEnd[2]
  expect(dbNewBlog.likes).toBe(0)
})

test('POST blog missing title or url property', async () => {
  const noTitle = {
    //missing title
    author: 'a3',
    url: 'u3',
    likes: 3  
  }

  const noUrl = {
    title: 'blog 3',
    author: 'a3',
    //missing url
    likes: 3 
  }

  const noBoth = {
    //missing title
    author: 'a3',
    //missing url
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(noUrl)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(noBoth)
    .expect(400)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('delete blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(b => b.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('update a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  let blogToUpdate = blogsAtStart[0]
  blogToUpdate.title = 'new Title'
  blogToUpdate.likes = 75

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length
  )

  const titles = blogsAtEnd.map(b => b.title)
  const likes = blogsAtEnd.map(b => b.likes)

  expect(titles).toContain(blogToUpdate.title)
  expect(likes).toContain(blogToUpdate.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
