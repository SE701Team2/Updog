import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileupload from 'express-fileupload';
const server = express();

import db from '../config/database';
import routes from './routes';
import { initializeApp } from "firebase/app";

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

const firebaseConfig = {
    apiKey: "AIzaSyBIOtL6KjR5pBSRVVqzWHWpfOokOXD-Ffc",
    authDomain: "updog-attachments.firebaseapp.com",
    projectId: "updog-attachments",
    storageBucket: "updog-attachments.appspot.com",
    messagingSenderId: "30682006423",
    appId: "1:30682006423:web:66a642212e83ad6cd3fad2",
    measurementId: "G-W26WPC0WGZ"
};
initializeApp(firebaseConfig);

export default server;
