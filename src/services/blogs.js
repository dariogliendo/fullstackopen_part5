import axios from 'axios'
const baseUrl = '/api/blogs'

let token;

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (userToken) => {
  token = userToken
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, setToken, create }