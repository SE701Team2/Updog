import axios from 'axios'
import SERVER_URL from '../config'

export const getHeaders = () => {
  const token = localStorage.getItem('token')

  if (!token) return null
  const headers = { Authorization: `Bearer ${token}` }

  return headers
}

const tokenExpired = (message) => {
  if (message === 'TokenExpiredError: jwt expired') {
    localStorage.removeItem('token')
    window.location.reload()
  }
}

export const request = async (url, method = 'GET', data = {}, jwt = null) => {
  const headers = jwt ? { Authorization: `Bearer ${jwt}` } : getHeaders()
  let error = null

  const response = await axios
    .request({
      url: `${SERVER_URL}/${url}`,
      method,
      data,
      headers,
    })
    .catch((err) => {
      error = err.response.data['Error message']
      tokenExpired(error)
    })

  return { data: response?.data ?? null, err: error }
}

export const uploadImage = async (formData = new FormData(), jwt = null) => {
  const headers = jwt ? { Authorization: `Bearer ${jwt}` } : getHeaders()
  let error = null

  const response = await axios
    .request({
      url: `${SERVER_URL}/images`,
      method: 'POST',
      data: formData,
      headers: {
        ...headers,
        'Content-Type': `multipart/form-data`,
      },
    })
    .catch((err) => {
      error = err.response.data['Error message']
      tokenExpired(error)
    })

  return { data: response?.data ?? null, err: error }
}
