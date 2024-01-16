import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const NewBlog = ({blogs, setBlogs}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  const notify = (type, message) => {
    setNotification({
      type, message
    })
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = { title, author, url }
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      notify('success', `a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      notify('error', error.response.data.error)
    }
  }

  return (
    <div>
      <h2>New blog</h2>
      <form className='formulary'>
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
        <button type="submit" onClick={createBlog}>Submit</button>
        <Notification notification={notification} />
      </form>
    </div>
  )
}

export default NewBlog