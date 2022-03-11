import models from '../database/models'
import { Authentication } from '../middlewares/authentication'
import db from '../config/database'
import server from '../server'

const assert = require('assert')
const request = require('supertest')

describe('Users', () => {
    let serverInstance
    beforeAll(() => {
        // Testing on a different port to avoid conflict
        db.sync().then(() => {
            serverInstance = server.listen(8000, () =>
                console.log(`server is running at ${8000}`)
            )
        })
    })

    describe('Encrypting password', () => {
        it('Should encrypt password before saving', async (done) => {
            // GIVEN a user has been created
            let password = 'PASSWORD'
            let randomUsername = (Math.random() + 1).toString(36).substring(7)

            await models.users.create({
                username: randomUsername,
                email: 'TEST@GMAIL.COM',
                password: password,
            })

            // WHEN we attempt to retrieve the user record directly from the DB
            const dbUser = await models.users.findOne({
                where: {
                    username: randomUsername,
                },
            })

            // THEN password stored in the db should be encrypted and not the same as the actual password
            assert.notEqual(dbUser.password, password)
            done()
        })
    })

    describe('Validating password', () => {
        it('Should count the password as valid', async (done) => {
            // GIVEN a user is created and retrieved from the db
            let password = 'PASSWORD'
            let randomUsername = (Math.random() + 1).toString(36).substring(7)

            await models.users.create({
                username: randomUsername,
                email: 'TEST@GMAIL.COM',
                password: password,
            })

            const dbUser = await models.users.findOne({
                where: {
                    username: randomUsername,
                },
            })

            // WHEN we input a valid password into the validatePassword method
            let isValid = dbUser.validatePassword(password)

            // THEN password should count as a valid password
            assert.equal(isValid, true)
            done()
        })

        it('Should NOT count the password as valid', async (done) => {
            // GIVEN a user is created and retrieved from the db
            let password = 'PASSWORD'
            let randomUsername = (Math.random() + 1).toString(36).substring(7)

            await models.users.create({
                username: randomUsername,
                email: 'TEST@GMAIL.COM',
                password: password,
            })

            const dbUser = await models.users.findOne({
                where: {
                    username: randomUsername,
                },
            })

            // WHEN we input an invalid password into the validatePassword method
            let isValid = dbUser.validatePassword('invalid')

            // THEN password should count as an invalid password
            assert.equal(isValid, false)
            done()
        })
    })

    describe('Validating Email', () => {
        it('Should not save user if email is invalid', async (done) => {
            // GIVEN a set of credentials
            let password = 'PASSWORD'
            let randomUsername = (Math.random() + 1).toString(36).substring(7)
            let email = 'qweqwewq'

            // Attempt to create user
            try {
                await models.users.create({
                    username: randomUsername,
                    email: email,
                    password: password,
                })

                // Email is invalid so should have thrown an error
                assert(false)
            } catch (e) {
                // Check the error is thrown by the email validation
                let errMessage = 'The email address you entered is invalid'
                assert.equal(e.errors[0].message, errMessage)
            }
            done()
        })
    })

    describe('Logging in with correct credentials', () => {
        it('Should return auth token and response status code 200', async (done) => {
            // GIVEN a created user
            let password = 'PASSWORD'
            let randomUsername = (Math.random() + 1).toString(36).substring(7)
            let email = 'test@' + randomUsername + '.com'

            const user = await models.users.create({
                username: randomUsername,
                email: email,
                password: password,
            })

            // WHEN that user logs in with the correct credentials
            const loginInfo = {
                email: email,
                password: password,
            }

            // THEN response status code should be 200
            let response = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            assert.equal(response.statusCode, 200)

            // AND the correct auth token should be returned
            let authUser = Authentication.extractUser(
                'Bearer ' + response.body.authToken
            )
            assert.equal(authUser.id, user.id)
            done()
        })
    })

    describe('Logging in with wrong password', () => {
        it('Should return a response status code of 401 and error message', async (done) => {
            // GIVEN a created user
            let password = 'PASSWORD'
            let randomUsername = (Math.random() + 1).toString(36).substring(7)
            let email = 'test@' + randomUsername + '.com'

            await models.users.create({
                username: randomUsername,
                email: email,
                password: password,
            })

            // WHEN the user attempts to log in with the wrong password
            const loginInfo = {
                email: email,
                password: 'WrongPassword',
            }
            let response = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            // THEN a response with status code 401 should be returned along with an error message
            assert.equal(response.statusCode, 401)
            assert.equal(response.body.error, 'Incorrect email or password')
            done()
        })
    })

    describe('Logging in with wrong email', () => {
        it('Should return a response status code of 401 and error message', async (done) => {
            // GIVEN a created user
            let password = 'PASSWORD'
            let randomUsername = (Math.random() + 1).toString(36).substring(7)
            let email = 'test@' + randomUsername + '.com'

            await models.users.create({
                username: randomUsername,
                email: email,
                password: password,
            })

            // WHEN the user attempts to log in with the wrong email
            const loginInfo = {
                email: 'wrong@email.com',
                password: password,
            }
            let response = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            // THEN a response with status code 401 should be returned along with an error message
            assert.equal(response.statusCode, 401)
            assert.equal(response.body.error, 'Incorrect email or password')
            done()
        })
    })

    afterAll((done) => {
        models.sequelize.close()
        serverInstance.close()
        done()
    })
})
