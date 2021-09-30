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
        if(!(nextBlog.hasOwnProperty('likes'))){
            throw new ReferenceError('No likes field in blog')
        }
        if(!(typeof nextBlog.likes === 'number')){
            throw new TypeError('likes field must be number')
        }
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
        if(!(blog.hasOwnProperty('likes'))){
            throw new ReferenceError('No likes field in blog')
        }
        if(!(typeof blog.likes === 'number')){
            throw new TypeError('likes field must be number')
        }
        return blog.likes
    })
    const maxLikes = blogs.reduce(max, 0)
    return blogs[likes.indexOf(maxLikes)]
 }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}

