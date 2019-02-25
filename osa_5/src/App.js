import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const userName = useField('text')
  const passWord = useField('password')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => {
        return b.likes - a.likes
      }))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    resetBlog()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })

    setMessage(`A new blog ${blogObject.title} by ${blogObject.author} was added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const likeBlog = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }

      const returnedBlog = await blogService.update(updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a, b) => {
        return b.likes - a.likes
      }))
    } catch (expection) {
      setErrorMessage('Something went wrong :<')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      console.log(blog)

      await blogService.remove(blog, user)
      setBlogs(blogs.filter(blog => blog.id !== id).sort((a, b) => {
        return b.likes - a.likes
      }))
    } catch (expection) {
      setErrorMessage('Something went wrong :<')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    const username = userName.value.toString()
    const password = passWord.value.toString()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.clear()
    window.location.reload()
  }

  const resetLogin = () => {
    userName.reset()
    passWord.reset()
  }

  const resetBlog = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  const loginForm = () => {

    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <h2>Log in to application</h2>
            <Notification message={errorMessage} error={true} />
            Username
            <input {...userName} reset={userName.reset.toString()}
            />
          </div>
          <div>
            Password
            <input {...passWord} reset={passWord.reset.toString()}
            />
          </div>
          <button type="submit">login</button>
        </form>

        <button onClick={() => resetLogin()}>reset</button>
      </div>
    )
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={false} />
      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog">
        <BlogForm
          onSubmit={addBlog}
          title={title}
          author={author}
          url={url}
          reset={resetBlog}
        />
      </Togglable>
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={() => likeBlog(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
            user={user}
          />
        )

      }
      <button onClick={() => likeBlog(blogs[4].id)}>like</button><br />
    </div >
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App