import models from '../../database/models';

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
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
