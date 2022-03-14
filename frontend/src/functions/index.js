import axios from 'axios'
import SERVER_URL from '../config'

export const getHeaders = () => {
    const token = localStorage.getItem('token')

    if (!token) return null
    const headers = { Authorization: `Bearer ${token}` }

    return headers
}

const tokenExpired = (message) => {
    if (message === 'JWT has expired') {
        localStorage.removeItem('token')
        localStorage.removeItem('meta')
        window.location.reload()
    }
}

// NOTE: PUT YOUR IP ADDRESS HERE
export const getData = async (url, data, jwt) => {
    const response = await axios
        .get(
            `${SERVER_URL}/${url}`,

            {
                headers: jwt
                    ? { Authorization: `Bearer ${jwt}` }
                    : getHeaders(),
                ...(data && { params: data }),
            }
        )
        .then((response) => {
            return response
        })
        .catch((error) => {
            if (!error?.response) {
                // in case the server goes down or something, instead of saying undefined give this error
                throw new Error(
                    `Sorry the server is currently sleeping, come back later`
                )
            }
            tokenExpired(error.response.data.error)
            throw new Error(`${error.response.data.error}`)
        })
    return response
}

export const postData = async (url, data = {}, jwt) => {
    const response = await axios
        .post(`${SERVER_URL}/${url}`, data, {
            headers: jwt ? { Authorization: `Bearer ${jwt}` } : getHeaders(),
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            if (!error?.response) {
                throw new Error(
                    `Sorry the server is currently sleeping, come back later`
                )
            }
            tokenExpired(error.response.data.error)
            throw new Error(`${error.response.data.error}`)
        })
    return response
}

export const patchData = async (url, data = {}) => {
    const response = await axios
        .patch(`${SERVER_URL}/${url}`, data, {
            headers: getHeaders(),
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            if (!error?.response) {
                throw new Error(
                    `Sorry the server is currently sleeping, come back later`
                )
            }
            tokenExpired(error.response.data.error)

            throw new Error(`${error.response.data.error}`)
        })
    return response
}
