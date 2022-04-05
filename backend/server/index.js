import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import fileupload from 'express-fileupload'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
import config from 'config'

import db from '../config/database'
import routes from './routes'

const server = express()

// Get different configs for dev and test, this is because in test
// request conflicts with yaml.load
const swaggerDocument = config.get('DEV')
  ? YAML.load(path.resolve('./specs/swagger.yaml'))
  : null

db.authenticate()
  // eslint-disable-next-line no-console
  .then(() => console.log('Database connected...'))
  // eslint-disable-next-line no-console
  .catch((err) => console.log('Error DB: => ', err))

server.use(cors())
server.use(morgan('dev'))
server.use(fileupload())
server.use(
  express.json({
    limit: '50mb',
  })
)
server.use(
  express.urlencoded({
    extended: true,
    limit: '50mb',
  })
)

/**
 * Access to swagger api documentation
 */
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.use('/api', routes)

export default server
