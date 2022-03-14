/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileupload from 'express-fileupload'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
import config from '../config/default'

import db from '../config/database'
import routes from './routes'

const server = express()

// Get different configs for dev and test, this is because in test
// request conflicts with yaml.load
const swaggerDocument = config.DEV
    ? YAML.load(path.resolve('./specs/swagger.yaml'))
    : null

db.authenticate()
    .then(() => console.log('Database connected...'))
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
        limit: '50mb',
    })
)
server.use(bodyParser.json())

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.use('/api', routes)

export default server
