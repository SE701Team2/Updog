import { useEffect, useState } from 'react'
import { request } from '../functions'

/**
 * useApi a custom react hook used to fetch from the server
 * returns loading, data, error states
 */
const useApi = (api, method, body, jwt) => {
  const [state, setState] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    let isCancelled = false
    request(api, method, body, jwt).then(({ data, err }) => {
      if (!isCancelled) {
        setError(err)
        setState(data)
        setLoading(false)
      }
    })
    return () => {
      isCancelled = true
    }
  }, [api])

  return { loading, data: state, error }
}

export default useApi
