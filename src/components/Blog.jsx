import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs, blogs }) => {
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
    <div style={{ border: "1px solid black", borderRadius: "4px", padding: "1em" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <span>
          {blog.title} - {blog.author}
        </span>
        <button onClick={() => setDetailVisibility(!detailVisibility)}>{detailVisibility ? "Hide" : "Show Details"}</button>
      </div>
      <div style={{ display: detailVisibility ? 'flex' : 'none', flexDirection: "column" }}>
        <span>{blog.url}</span>
        <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
          <span>Likes: {blog.likes || 0}</span>
          <button onClick={addLike}>Like</button>
        </div>
        <span>{blog.user?.name || ''}</span>
        <button onClick={remove} style={{alignSelf: "flex-start"}}>Remove</button>
      </div>
    </div>
  )
}

export default Blog