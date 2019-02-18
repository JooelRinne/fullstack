const lodash = require('lodash')

const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)

  return likes
}

const favouriteBlog = (blogs) => {
  const favourite =
    (blogs.length === 0)
      ? 0
      : blogs.reduce((previousBlog, currentBlog) => {
        return (previousBlog.likes > currentBlog.likes)
          ? previousBlog
          : currentBlog
      })
  return { title: favourite.title, author: favourite.author, likes: favourite.likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return { author: undefined, blogs: 0 }
  }
  const authors = blogs.map(blog => blog.author)
  const authorsCountBy = lodash.countBy(authors)
  const authorMostBlogs =
    Object.keys(authorsCountBy).reduce((pA, cA) => {
      return (authorsCountBy[pA] > authorsCountBy[cA])
        ? pA
        : cA
    })

  return { author: authorMostBlogs, blogs: authorsCountBy[authorMostBlogs] }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}