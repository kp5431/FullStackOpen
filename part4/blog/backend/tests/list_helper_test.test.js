/**
 * This file runs various tests for the functions in
 * the file utils/list_helper.js
 */

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('Total Likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    
      test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(listWithOneBlog[0].likes)
      })

      const listWithManyBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 6,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 4,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 3,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 2,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 1,
          __v: 0
        },
      ]
    
      test('test of 6 different like nums: 1 + 2 + 3 + 4 + 5 + 6 = 21', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(21)
      })

      const blogMissingLikesField = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          __v: 0
        }
      ]
    
      test('blog missing likes field', () => {
        expect(() => listHelper.totalLikes(blogMissingLikesField)).toThrow('blog missing likes property')
      })

      const blogLikesWrongType = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          likes: '5',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          __v: 0
        }
      ]
    
      test('likes field is a string not a number', () => {
        expect(() => listHelper.totalLikes(blogLikesWrongType)).toThrow('likes field must be number')
      })
})

describe('Max Likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('When list has only one blog, max is the only blog in there', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    },
  ]

  test('test of 6 different blogs', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual(listWithManyBlogs[0])
  })

  const blogMissingLikesField = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      __v: 0
    }
  ]

  test('blog missing likes field', () => {
    expect(() => listHelper.favoriteBlog(blogMissingLikesField)).toThrow('blog missing likes property')
  })

  const blogLikesWrongType = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: '5',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      __v: 0
    }
  ]

  test('likes field is a string not a number', () => {
    expect(() => listHelper.favoriteBlog(blogLikesWrongType)).toThrow('likes field must be number')
  })

  const listWithManyBlogs0Likes = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
  ]

  test('test of 6 different blogs with same num of likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs0Likes)
    expect(result).toEqual(listWithManyBlogs0Likes[0])
  })
})

describe('Max Blogs', () => {
  const listWithManyBlogsDiffAuthors = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: '1',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: '1',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: '2',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
  ]

  test('test of 6 different blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogsDiffAuthors)
    expect(result)
      .toEqual(
        {'author': 'Edsger W. Dijkstra',
         'blogs': 3
        }
      )
  })

  test('test with empty blog list', () => {
    expect(listHelper.mostBlogs([])).toEqual({"author": "", "blogs": 0})
  })

})

describe('Max Likes Per Author', () => {
  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: '1',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: '1',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: '2',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },
  ]

  test('test of 6 different blogs', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result)
      .toEqual(
        {'author': 'Edsger W. Dijkstra',
         'likes': 6
        }
      )
  })

  test('test with empty blog list', () => {
    expect(listHelper.mostLikes([])).toEqual({"author": "", "likes": 0})
  })
})