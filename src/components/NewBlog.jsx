import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const NewBlog = ({ createBlog, notification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <Togglable buttonLabel={'New blog'} openButtonId={'new-blog-button'} cancelButtonId={'new-blog-cancel-button'}>
        <h2>New blog</h2>
        <form className='new-blog-form' onSubmit={(event) => createBlog({ title, author, url }, event)} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <div className="input">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div className="input">
            <label htmlFor="author" name="author">Author</label>
            <input type="text" name="author" onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div className="input">
            <label htmlFor="url" name="url">Url</label>
            <input type="text" name="url" onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type="submit">Submit</button>
          <Notification notification={notification} />
        </form>
      </Togglable>
    </div>
  )
}

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
  notification: PropTypes.object
}

export default NewBlog