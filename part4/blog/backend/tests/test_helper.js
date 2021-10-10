const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}