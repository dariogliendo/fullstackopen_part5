import axios from 'axios'
const baseUrl = '/api/blogs'


let token;

// Get auth header via function so token is not outdated
const createAuthHeader = () => {
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (userToken) => {
  token = userToken
}


const create = async (blog) => {
  
  const response = await axios.post(baseUrl, blog, createAuthHeader())
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(baseUrl + `/${blog.id}`, blog)
  return response.data
}

const remove = async (id) => {
  try {
    await axios.delete(baseUrl + `/${id}`, createAuthHeader())
  } catch (error) {
    throw new Error(error)
  }
}

export default { getAll, setToken, create, update, remove }