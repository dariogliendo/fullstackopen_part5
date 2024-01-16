import React, { useEffect, useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'
import PropTypes from 'prop-types'

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (type, message) => {
    return new Promise(resolve => {
      setNotification({
        type, message
      })
      setTimeout(() => {
        setNotification(null)
        resolve()
      }, 2000)
    })
  }

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const response = await loginService.login(username, password)
      await notify("success", "Logged in successfully")
      setUser(response)
      localStorage.setItem('loggedUser', JSON.stringify(response))
      blogService.setToken(response.token)
    } catch (error) {
      notify("error", error.response.data.error)
    }
  }


  const logout = () => {
    setUser(null)
    localStorage.removeItem('loggedUser')
  }

  return (
    <>
      {
        user
          ? (
            <div>
              <span> {user.name} logged in </span>
              <button onClick={logout}>logout</button>
            </div>
          )
          : (
            <form className="formulary">
              <div className="input">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={({ target }) => setUsername(target.value)} />
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={({ target }) => setPassword(target.value)} />
              </div>
              <button onClick={handleLogin}>Login</button>
              <Notification notification={notification}></Notification>
            </form>
          )
      }
    </>
  )
}

Login.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
}

export default Login