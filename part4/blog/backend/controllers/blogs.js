/***
 * This file sets up all the routes for /api/blogs
 * Handles CRUD operations on the db 
***/

const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
blogRouter.post('/', async (request, response) => {
    if(!request.body.hasOwnProperty('likes')){
      request.body.likes = 0
    }
    if(!request.body.hasOwnProperty('title') ||
       !request.body.hasOwnProperty('url')){
        response.status(400).send( //status().send() sends the status code back to client
          { 
            error: 'blog from HTTP POST missing title and/or url property' 
          })
    }
    else{
      const blog = new Blog(request.body)
      const result = await blog.save()
      response.status(201).json(result)
    }
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