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
    // const { params } = req;
    // const user = await models.users.findByPk(params.id);
    /** Instead of the above commented code, should use authToken
     * provided in the request header
     */
    const authToken = req.get('authToken');
    const user = await Authentication.extractUser(authToken);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({"Error message": error.toString()});
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { body } = req;
    const username = body.firstName;
    const password = body.lastName; //TODO: use password
    const authToken = Authentication.generateAuthToken(username, password);
    const setToken = await models.users.update(
      { authToken: authToken },
      { where: { id: body.id } }
    );
    res.status(200).send({
      "message": "Authentication successful",
      "authToken": authToken
    });
    // .cookie('authToken', 'test', {maxAge: 900000});
  } catch (error) {
    res.status(500).send({"Error message": error.toString()})
  }
}