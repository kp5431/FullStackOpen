/**
 * A collection of helper functions for the blog list
 */

const dummy = (blogs) => 1

/**
 * Returns the total sum of likes in all of the blog posts
 * @param {*} posts An array of blog posts 
 */
 const totalLikes = (posts) => {
    const sumLikes = (currSum, nextBlog) => {
        if(!(nextBlog.hasOwnProperty('likes'))){
            throw new ReferenceError('No likes field in blog')
        }
        if(!(typeof nextBlog.likes === 'number')){
            throw new TypeError('likes field must be number')
        }
        return currSum + nextBlog.likes

    }
    return posts.reduce(sumLikes, 0)
}

module.exports = {
    dummy,
    totalLikes
}

