import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  onSubmit,
  title,
  author,
  url,
  reset
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input {...title} reset={title.reset.toString()}/>
        </div>
        <div>
          author:
          <input {...author} reset={author.reset.toString()} />
        </div>
        <div>
          url:
          <input {...url} reset={url.reset.toString()}/>
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={reset}>reset</button>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm