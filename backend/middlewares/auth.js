import Authentication from './authentication'

module.exports = (req, res, next) => {
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
      } else {
        res.locals.decodedUser = decodedUser
        next()
      }
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    })
    return
  }
}
