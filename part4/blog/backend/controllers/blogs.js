/***
 * This file sets up all the routes for /api/blogs
 * Handles CRUD operations on the db 
***/

const blogRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      //populate the user field of each blog with content from the attached user
      .populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
blogRouter.post('/', async (request, response) => {
    if(!request.body.hasOwnProperty('likes')){
      request.body.likes = 0
    }
    if(!request.body.hasOwnProperty('title') ||
       !request.body.hasOwnProperty('url')){
        return response.status(400).send( //status().send() sends the status code back to client
          { //return so execution stops
            error: 'blog from HTTP POST missing title and/or url property' 
          })
    }
    const userToAttach = await User.findOne({}) //random user from db
    const blogDoc = new Blog({
      title: request.body.title,
      author: userToAttach.name,
      user: userToAttach._id.toString(), //attach the id of the random user
      url: request.body.url,
      likes: request.body.likes
    })
    
    //save new blog to db
    const result = await blogDoc.save()
    response.status(201).json(result)
  
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updateBlogInDb = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updateBlogInDb.toJSON())
  
})


  

module.exports = blogRouter