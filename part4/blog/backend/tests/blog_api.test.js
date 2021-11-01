const mongoose = require('mongoose') 
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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

test('blogs added have a randomly assigned user', async () => {

  await User.deleteMany({}) //delete all users
  await Blog.deleteMany({}) //delete all blogs

  const newUser = { //the user the api assigns blogs to
    username: 'user',
    name: 'Gets assigned to blogs',
    password: 'password',
  }

  const newBlog = {
    title: 'blog rando',
    author: 'a3',
    url: 'testUrl',
    likes: 25
  }

  //send new user to db
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  //send new blog to db
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  //ensure only the newUser user exists in the db
  const userResponse = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(userResponse.body).toHaveLength(1)
  const usernames = userResponse.body.map(userObj => userObj.username)
  expect(usernames[0]).toBe(newUser.username)

  //expect the api to populate newBlog's user field with data from newUser
  const blogResponse = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(blogResponse.body).toHaveLength(1) //only 1 blog expected to exist
  const blogs = blogResponse.body //array of blogs
  expect(blogs[0].author).toBe(newUser.name) //expect blog's author to be the same as newUser's name
  const attachedUser = blogs[0].user //get all of the user data attached to the blog by the api
  expect(attachedUser.username).toBe(newUser.username) //ensure attachedUser's fields are the same as newUser's fields.
  expect(attachedUser.name).toBe(newUser.name)
  expect(attachedUser.id).toBe(userResponse.body[0].id)
  
  //uncomment to print the blog
  //blogResponse.body.forEach(blog => console.log(blog))


})



afterAll(() => {
  mongoose.connection.close()
})
