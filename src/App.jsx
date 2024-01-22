import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import './main.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newBlogNotification, setNewBlogNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const notify = (type, message) => {
    setNewBlogNotification({
      type, message
    })
    setTimeout(() => {
      setNewBlogNotification(null)
    }, 2000)
  }

  const createBlog = async (blog, event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(blog)
      newBlog.user = user;
      setBlogs(blogs.concat(newBlog))
      notify('success', `a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      notify('error', error.response.data.error)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2>blogs</h2>
      <Login setUser={setUser} user={user} />
      {user && (
        <>
          <NewBlog createBlog={createBlog} notification={newBlogNotification} />
          <div className="blogs-container" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {user && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App