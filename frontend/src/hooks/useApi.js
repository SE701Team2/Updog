import { useEffect, useState } from 'react'
import { request } from '../functions'

const useApi = (api, method, body, jwt) => {
    const [state, setState] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        request(api, method, body, jwt).then(({ data, err }) => {
            setError(err)
            setState(data)
            setLoading(false)
        })
    }, [])

    return { loading, data: state, error }
}

export default useApi
