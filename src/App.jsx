import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import './main.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2>blogs</h2>
      <Login setUser={setUser} user={user} />
      {user && (
        <>
          <NewBlog blogs={blogs} setBlogs={setBlogs} user={user}/>
          {user && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs}/>
          )}
        </>
      )}
    </div>
  )
}

export default App