import req from 'express/lib/request';
import models from '../../database/models';
import { Authentication } from '../../middlewares/authentication';

export const addUser = async (req, res) => {
  try {
    const { body } = req;
    console.log('🚀 ~ file: user.js ~ line 6 ~ addUser ~ body', body);

    const createUser = await models.users.create({
      username: body.username,
      email: body.email,
      password: body.password
    });

    res.status(201).send(createUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUsersById = async (req, res) => {
  try {
    const { params } = req;
    const user = await models.users.findByPk(params.id);
    const authToken = req.get('authToken');

    if (!authToken) {
      res.status(400).send({
        "Error message": "Auth token not provided"
      })
    } 

    const decodedUser = Authentication.extractUser(authToken);

    if (decodedUser.id != params.id) {
      res.status(401).send({
        "Error message": "Auth token invalid"
      })

    } else {
      res.status(200).send(user);
    }
    
  } catch (error) {
    res.status(500).send({"Error message": error.toString()});
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { body } = req;
    const user = await models.users.findByPk(body.id);

    if (user.id) {
      const authToken = Authentication.generateAuthToken(user);
      res.status(200).send({
        "message": "Authentication successful",
        "authToken": authToken
      });

    } else {
      res.status(404).send({
        "Error message": "Authentication failed, couldn't find user"
      })
    }
    
  } catch (error) {
    res.status(500).send({"Error message": error.toString()})
  }
}