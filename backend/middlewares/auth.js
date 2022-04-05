import Authentication from './authentication'

/**
 * Auth middleware for express. Verifies the users and add decoded user to locals variable
 * sends status 400 if no token is provided
 * sends status 401 if not authorised
 */
export const auth = (req, res, next) => {
  try {
    const authToken = req.get('Authorization')
    if (!authToken) {
      res.status(400).json({
        error: new Error('Auth token not provided'),
      })
      return
    } else {
      const decodedUser = Authentication.extractUser(authToken)
      if (!decodedUser.id) {
        res.status(401).json({
          error: new Error('Invalid auth token'),
        })
        return
      }
      res.locals.decodedUser = decodedUser
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    })
    return
  }
}
