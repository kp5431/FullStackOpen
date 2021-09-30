/**
 * A collection of helper functions for the blog list
 */

const dummy = (blogs) => 1

/**
 * Returns the total sum of likes in all of the blog posts
 * @param {*} blogs An array of blog posts 
 */
 const totalLikes = (blogs) => {
    const sumLikes = (currSum, nextBlog) => {
        errorHandler(nextBlog)
        return currSum + nextBlog.likes

    }
    return blogs.reduce(sumLikes, 0)
}

/**
 * Figures out which blog has the most likes from a list of blogs.
 * If more than one blog has the highest number of likes, then return
 * only 1 of them
 */
 const favoriteBlog = (blogs) => {
    const max = (last, nextBlog) => {
        return last >= nextBlog.likes ? last : nextBlog.likes
    }

    const likes = blogs.map((blog) => {
        errorHandler(blog)
        return blog.likes
    })
    const maxLikes = blogs.reduce(max, 0)
    return blogs[likes.indexOf(maxLikes)]
 }

 /**
  * Find the author who has the largest amount of blogs from an array 
  * of blogs. Return is an object that looks like:
  * {
  *     author: "ex name", //author's name
  *     blogs: 6 //the total number of blogs the author has
  * }
  */
 const mostBlogs = (blogs) => {
    
    //map author name to number of blogs
    const dict = {}
    blogs.forEach((blog) => {
        if(dict.hasOwnProperty(blog.author)){
            dict[blog.author] = dict[blog.author] + 1
        }
        else{
            dict[blog.author] = 1
        }
    })

    //find the max amount of authors in the dict
    let maxBlogs = 0
    let maxAuthor = ''
    for(const author in dict){
        if(dict[author] > maxBlogs){
            maxBlogs = dict[author]
            maxAuthor = author
        }
    }

    return {
            'author': maxAuthor,
            'blogs': maxBlogs
           }
 }

 /**
  * throws errors if the blog's properties are of unexpected type or missing
  * {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      __v: 0
    }
  */
 const errorHandler = (blog) => {
    //check that all expected properties exist
    if(!(blog.hasOwnProperty('_id'))){
        throw new ReferenceError('blog missing _id property')
    }
    else if(!(blog.hasOwnProperty('title'))){
        throw new ReferenceError('blog missing title property')
    }
    else if(!(blog.hasOwnProperty('author'))){
        throw new ReferenceError('blog missing author property')
    }
    else if(!(blog.hasOwnProperty('likes'))){
        throw new ReferenceError('blog missing likes property')
    }
    else if(!(blog.hasOwnProperty('url'))){
        throw new ReferenceError('blog missing url property')
    }
    else if(!(blog.hasOwnProperty('__v'))){
        throw new ReferenceError('blog missing __v property')
    }
    else if(!(typeof blog.likes === 'number')){
        throw new TypeError('likes field must be number')
    }
 }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}

