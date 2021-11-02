/**
 * This file extracts some helper methods for the test functions
 */

const Blog = require('../models/blog')
const User = require('../models/user')

const firstLoggedIn = {
  username: 'firstUser',
  name: 'First User',
  password: 'goodPassword',
}

const initialBlogs = [
  {
    title: 'blog 1',
    author: 'a1',
    url: 'u1',
    likes: 1
  },
  {
    title: 'blog 2',
    author: 'a2',
    url: 'u2',
    likes: 2
  },
]
const users = [
  {
    username: 'testUser',
    name: 'Test User',
    password: 'password',
  },
  {
    username: 'testUser2',
    name: 'Test User 2',
    password: 'password2',
  },
  {
    username: 'testUser3',
    name: 'Test User 3',
    password: 'password3',
  }
]

//get all the blogs from the db without them going through our server's processing
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

//get all the users from the db without them going through our server's processing
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  users,
  firstLoggedIn,
  blogsInDb,
  usersInDb
}