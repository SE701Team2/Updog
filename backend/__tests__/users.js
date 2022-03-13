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
                // eslint-disable-next-line no-console
                console.log(`server is running at ${8000}`)
            )
        })
    })

    beforeEach(async () => {
        await models.users.destroy({
            where: {},
        })

        await models.followers.destroy({
            where: {},
        })
    })

    describe('Encrypting password', () => {
        it('Should encrypt password before saving', async () => {
            // GIVEN a user has been created
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)

            await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email: 'TEST@GMAIL.COM',
                password,
            })

            // WHEN we attempt to retrieve the user record directly from the DB
            const dbUser = await models.users.findOne({
                where: {
                    username: randomUsername,
                },
            })

            // THEN password stored in the db should be encrypted and not the same as the actual password
            assert.notEqual(dbUser.password, password)
        })
    })

    describe('Validating password', () => {
        it('Should count the password as valid', async () => {
            // GIVEN a user is created and retrieved from the db
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)

            await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email: 'TEST@GMAIL.COM',
                password,
            })

            const dbUser = await models.users.findOne({
                where: {
                    username: randomUsername,
                },
            })

            // WHEN we input a valid password into the validatePassword method
            const isValid = dbUser.validatePassword(password)

            // THEN password should count as a valid password
            expect(isValid).toBe(true)
        })

        it('Should NOT count the password as valid', async () => {
            // GIVEN a user is created and retrieved from the db
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)

            await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email: 'TEST@GMAIL.COM',
                password,
            })

            const dbUser = await models.users.findOne({
                where: {
                    username: randomUsername,
                },
            })

            // WHEN we input an invalid password into the validatePassword method
            const isValid = dbUser.validatePassword('invalid')

            // THEN password should count as an invalid password
            expect(isValid).toBe(false)
        })
    })

    describe('Validating Email', () => {
        it('Should not save user if email is invalid', async () => {
            // GIVEN a set of credentials
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = 'qweqwewq'

            // Attempt to create user
            try {
                await models.users.create({
                    username: randomUsername,
                    nickname: randomUsername,
                    email,
                    password,
                })

                // Email is invalid so should have thrown an error
                assert.fail('Email should not have been saved as it is invalid')
            } catch (e) {
                // Check the error is thrown by the email validation
                const errMessage = 'The email address you entered is invalid'
                assert.equal(e.errors[0].message, errMessage)
            }
        })
    })

    describe('Logging in with correct credentials', () => {
        it('Should return auth token and response status code 200', async () => {
            // GIVEN a created user
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`

            const user = await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
            })

            // WHEN that user logs in with the correct credentials
            const loginInfo = {
                email,
                password,
            }

            // THEN response status code should be 200
            const response = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            assert.equal(response.statusCode, 200)

            // AND the correct auth token should be returned
            const authUser = Authentication.extractUser(
                `Bearer ${response.body.authToken}`
            )
            assert.equal(authUser.id, user.id)
        })
    })

    describe('Logging in with wrong password', () => {
        it('Should return a response status code of 401 and error message', async () => {
            // GIVEN a created user
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`

            await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
            })

            // WHEN the user attempts to log in with the wrong password
            const loginInfo = {
                email,
                password: 'WrongPassword',
            }
            const response = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            // THEN a response with status code 401 should be returned along with an error message
            assert.equal(response.statusCode, 401)
            assert.equal(response.body.error, 'Incorrect email or password')
        })
    })

    describe('Logging in with wrong email', () => {
        it('Should return a response status code of 401 and error message', async () => {
            // GIVEN a created user
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`

            await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
            })

            // WHEN the user attempts to log in with the wrong email
            const loginInfo = {
                email: 'wrong@email.com',
                password,
            }
            const response = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            // THEN a response with status code 401 should be returned along with an error message
            assert.equal(response.statusCode, 401)
            assert.equal(response.body.error, 'Incorrect email or password')
        })
    })

    describe('Testing getUsersByUsername endpoint', () => {
        it('Should return a 200 status response', async () => {
            // GIVEN a created user
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`
            const profilePic = 'https://imgur.com/gallery/zIMAzsV'
            const profileBanner = 'https://imgur.com/gallery/RstwImS'
            const bio = 'Bio'

            const result = await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
                profilePic,
                profileBanner,
                bio,
            })

            const loginInfo = {
                email,
                password,
            }

            const auth = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            // add to followers table, userDTO just needs to count Ids
            const followers = [
                { followedId: result.id, followerId: 1000 },
                { followedId: result.id, followerId: 2000 },
            ]
            await models.followers.bulkCreate(followers)

            // user viewing itself
            const response = await request('http://localhost:8000/api')
                .get(`/users/${result.username}`)
                .set('Authorization', `Bearer ${auth.body.authToken}`)

            const expectedResponse = {
                id: response.body.id,
                username: randomUsername,
                nickname: randomUsername,
                profilePic,
                profileBanner,
                bio,
                followers: 2,
                following: 0,
                joinedDate: response.body.joinedDate,
            }

            assert.equal(response.statusCode, 200)
            assert.equal(
                JSON.stringify(response.body),
                JSON.stringify(expectedResponse)
            )
        })
    })

    describe('Testing addUser endpoint', () => {
        it('Should return a 201 status response', async () => {
            // GIVEN a created user
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`

            const requestBody = {
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
            }

            const response = await request('http://localhost:8000/api')
                .post('/users')
                .send(requestBody)

            const expectedResponse = {
                id: response.body.id,
                username: randomUsername,
                nickname: randomUsername,
                followers: 0,
                following: 0,
                joinedDate: response.body.joinedDate,
            }

            assert.equal(response.statusCode, 201)
            assert.equal(
                JSON.stringify(response.body),
                JSON.stringify(expectedResponse)
            )
        })
    })

    afterAll(() => {
        models.sequelize.close()
        serverInstance.close()
    })
})
