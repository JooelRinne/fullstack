import React, { useState, useEffect } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  useEffect(() => {
    user.id === blog.user.id
      ? setRemoveVisible(true)
      : setRemoveVisible(false)
  }, [])

  const hideWhenVisible = {
    display: visible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonVisible = {
    display: removeVisible ? '' : 'none',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <div className = "content">
      <div style={hideWhenVisible}>
        <div onClick={toggleVisibility} className="shortContent">
          {blog.title} {blog.author}
        </div>
      </div>
      <div style={showWhenVisible} className="fullContent">
        <div onClick={toggleVisibility} className="blog">
          {blog.title} {blog.author}<br />
          {blog.url}<br />
          {blog.likes} likes
          <button onClick= {likeBlog}>like</button><br />
          added by {blog.user.name}<br />
          <button style={buttonVisible} onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog