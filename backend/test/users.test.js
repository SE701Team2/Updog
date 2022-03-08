import models from '../database/models';

const assert = require('assert');

describe('Users', () => {
  describe('Encrypting password', () => {
    it('Should encrypt password before saving', async done => {
      // GIVEN a user has been created
      let password = 'PASSWORD';
      let randomUsername = (Math.random() + 1).toString(36).substring(7);

      await models.users.create({
        username: randomUsername,
        email: 'TEST@GMAIL.COM',
        password: password
      });

      // WHEN we attempt to retrieve the user record directly from the DB
      const dbUser = await models.users.findOne({
        where: {
          username: randomUsername
        }
      });

      // THEN password stored in the db should be encrypted and not the same as the actual password
      assert.notEqual(dbUser.password, password);
      done();
    });
  });

  describe('Validating password', () => {
    it('Should count the password as valid', async done => {
      // GIVEN a user is created and retrieved from the db
      let password = 'PASSWORD';
      let randomUsername = (Math.random() + 1).toString(36).substring(7);

      await models.users.create({
        username: randomUsername,
        email: 'TEST@GMAIL.COM',
        password: password
      });

      const dbUser = await models.users.findOne({
        where: {
          username: randomUsername
        }
      });

      // WHEN we input a valid password into the validatePassword method
      let isValid = dbUser.validatePassword(password);

      // THEN password should count as a valid password
      assert.equal(isValid, true);
      done();
    });

    it('Should NOT count the password as valid', async done => {
      // GIVEN a user is created and retrieved from the db
      let password = 'PASSWORD';
      let randomUsername = (Math.random() + 1).toString(36).substring(7);

      await models.users.create({
        username: randomUsername,
        email: 'TEST@GMAIL.COM',
        password: password
      });

      const dbUser = await models.users.findOne({
        where: {
          username: randomUsername
        }
      });

      // WHEN we input an invalid password into the validatePassword method
      let isValid = dbUser.validatePassword('invalid');

      // THEN password should count as an invalid password
      assert.equal(isValid, false);
      done();
    });

    describe('Validating Email', () => {
      it('Should not save user if email is invalid', async done => {
        // GIVEN a set of credentials
        let password = 'PASSWORD';
        let randomUsername = (Math.random() + 1).toString(36).substring(7);
        let email = 'qweqwewq';

        // Attempt to create user
        try {
          await models.users.create({
            username: randomUsername,
            email,
            password
          });

          // Email is invalid so should have thrown an error
          assert(false);
        } catch (e) {
          // Check the error is thrown by the email validation
          let errMessage = 'The email address you entered is invalid';
          assert.equal(e.errors[0].message, errMessage);
        }
        done();
      });
    });
  });

  afterAll(done => {
    models.sequelize.close();
    done();
  });
});
