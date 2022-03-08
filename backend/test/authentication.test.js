import models from '../database/models';
import { Authentication } from '../middlewares/authentication';

const assert = require('assert');

describe('Authentication', () => {
    describe('Generating token', () => {
        it('Test that the string returned is the correct format', () => {
            const user = {
                firstName: "first",
                lastName: "last",
                email: "test@email"
            }
    
            const authToken = Authentication.generateAuthToken(user);

            const tokenArray = authToken.split(".");
    
            assert.strictEqual(tokenArray.length, 3);
        });

    });

    describe('Extracting user', () => {
        it('Test extracting user from jwt', async() => {
            await models.users.create({
                firstName: "First",
                lastName: "last",
                email: "test@email"
            });

            const user = await models.users.findOne({
                where: {
                    firstName: "First"
                }
            })

            const authToken = Authentication.generateAuthToken(user);

            const decodedUser = Authentication.extractUser("Bearer " + authToken);
            assert.strictEqual(decodedUser.firstName, "First");
            assert.strictEqual(decodedUser.lastName, "last");
            assert.strictEqual(decodedUser.email, "test@email");
        });
    });
});