import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [detailVisibility, setDetailVisibility] = useState(false)

  const addLike = async () => {
    try {
      const likes = blog.likes || 0
      const response = await blogService.update({
        ...blog,
        likes: likes + 1
      })
      response.user = blog.user
      setBlogs(blogs.map((f) => f.id !== response.id ? f : response))
    } catch (error) {
      alert(error)
    }
  }

  const remove = async () => {
    try {
      if (!window.confirm(`Do you wish to remove blog "${blog.title}" by ${blog.author}?`)) return
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(f => f.id !== blog.id))
    } catch (error) {
      alert(error)
    }

  }

  return (
    <div style={{ border: '1px solid black', borderRadius: '4px', padding: '1em' }} className='blog-container'>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
        <span>
          {blog.title} - {blog.author}
        </span>
        <button onClick={() => setDetailVisibility(!detailVisibility)}>{detailVisibility ? 'Hide' : 'Show Details'}</button>
      </div>
      <div style={{ display: detailVisibility ? 'flex' : 'none', flexDirection: 'column' }} className='blog-details'>
        <span>{blog.url}</span>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
          <span>Likes: {blog.likes || 0}</span>
          <button onClick={addLike} id={'like-button'}>Like</button>
        </div>
        <span>{blog.user?.name || ''}</span>
        {blog.user.username === user.username ?
          <button onClick={remove} style={{alignSelf: 'flex-start'}} id={'remove-button'}>Remove</button>
          : ''
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired
}

export default Blog