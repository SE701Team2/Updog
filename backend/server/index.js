import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileupload from 'express-fileupload';
const server = express();

import db from '../config/database';
import routes from './routes';

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error DB: => ', err));

server.use(cors());
server.use(morgan('dev'));
server.use(fileupload());
server.use(
  express.json({
    limit: '50mb'
  })
);
server.use(
  express.urlencoded({
    limit: '50mb'
  })
);
server.use(bodyParser.json());
server.use('/api-doc', express.static(__dirname + '/public'));
server.use('/api', routes);

export default server;
