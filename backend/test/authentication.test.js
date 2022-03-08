const Authentication = require('../middlewares/authentication.js');
const models = require('../database/models')

const assert = require('assert');

describe('Authentication', () => {
    describe('Generating token', () => {
        it('Test that the string returned is the correct jwt', () => {
            const user = {
                firstName: "first",
                lastName: "last",
                email: "test@email"
            }
    
            const header = {
                "alg": "HS256",
                "typ": "JWT"
            };
            const payload = {
                "data": JSON.stringify(user)
            }
            const signature = Authentication.privateKey();
            const jwt = base64(header) + '.' + base64(payload) + '.' + base64(signature);
    
            const authToken = Authentication.generateAuthToken(user);
    
            assert.strictEqual(jwt, authToken);
        });
        

    });

    describe('Extracting user', () => {
        it('Test extracting user from jwt', async() => {
            await models.user.create({
                firstName: "first",
                lastName: "last",
                email: "test@email"
            });

            const user = await models.users.findOne({
                where: {
                    firstName: "first"
                }
            })

            const authToken = Authentication.generateAuthToken(user);

            const decodedUser = Authentication.extractUser(authToken);
            assert.strictEqual(decodedUser.firstName, "first");
        });
    });
});