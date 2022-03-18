import models from '../database/models'
import { UserDTO } from '../dto/users'
import { Authentication } from '../middlewares/authentication'
import db from '../config/database'
import server from '../server'
import { convertToPostDto } from '../dto/posts'

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

        await models.posts.destroy({
            where: {},
        })

        await models.likedPost.destroy({
            where: {},
        })

        await models.sharedPost.destroy({
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
            expect(response.body.username).toEqual(randomUsername)

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

        it('Should return a 404 status response', async () => {
            // random username that doesn't exist
            const randomUsername = (Math.random() + 1).toString(36).substring(7)

            // trying to get this user, don't need authentication as 404 should return first
            const response = await request('http://localhost:8000/api').get(
                `/users/${randomUsername}`
            )

            assert.equal(response.statusCode, 404)
            assert.equal(
                response.body.error,
                `User '${randomUsername}' not found`
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

            const jwt = response.body.authToken // expect a token
            const user = Authentication.extractUser(`Bearer ${jwt}`)

            assert.equal(response.statusCode, 201)
            assert.equal(user.username, requestBody.username)
            assert.equal(user.nickname, requestBody.nickname)
            assert.equal(user.email, requestBody.email)
        })
    })

    describe('Testing getUserActivity endpoint', () => {
        it('Should return a 200 status response and a list of activities from latest to earliest', async () => {
            // GIVEN a user who posts, likes, and shares a post
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`

            const newUser = await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
            })

            const newPost = await models.posts.create({
                text_content: 'Updog is the next big thing',
                author: newUser.id,
                createdAt: '2020-03-13 04:56:53',
            })

            const likedPost = await models.likedPost.create({
                postId: newPost.id,
                userId: newUser.id,
                createdAt: '2021-03-13 04:56:53',
            })

            const sharedPost = await models.sharedPost.create({
                postId: newPost.id,
                userId: newUser.id,
                createdAt: '2021-03-14 04:56:53',
            })

            // WHEN the logged in user tries to view the user activity
            const authToken = Authentication.generateAuthToken(newUser)

            const response = await request('http://localhost:8000/api')
                .get(`/users/${randomUsername}/activity`)
                .set('Authorization', `Bearer ${authToken}`)

            // THEN their activity should be listed from latest to earliest
            const expectedOutput = [
                {
                    postID: newPost.id,
                    timestamp: Date.parse(sharedPost.createdAt),
                    activity: 'SHARED',
                },
                {
                    postID: newPost.id,
                    timestamp: Date.parse(likedPost.createdAt),
                    activity: 'LIKED',
                },
                {
                    postID: newPost.id,
                    timestamp: Date.parse(newPost.createdAt),
                    activity: 'POSTED',
                },
            ]

            expect(response.statusCode).toEqual(200)
            expect(response.body).toEqual(expectedOutput)
        })
    })

    describe('GET /feed endpoint', () => {
        it('Should return a 200 status response and a list of activities from latest to earliest of the followed user', async () => {
            // GIVEN two users
            const password = 'PASSWORD'
            const randomUsername1 = (Math.random() + 1)
                .toString(36)
                .substring(7)
            const email1 = `test@${randomUsername1}.com`

            const user1 = await models.users.create({
                username: randomUsername1,
                nickname: randomUsername1,
                email: email1,
                password,
            })

            const randomUsername2 = (Math.random() + 1)
                .toString(36)
                .substring(7)
            const email2 = `test@${randomUsername2}.com`

            const user2 = await models.users.create({
                username: randomUsername2,
                nickname: randomUsername2,
                email: email2,
                password,
            })

            const newPost = await models.posts.create({
                text_content: 'Updog is the next big thing',
                author: user1.id,
                parent: null,
                createdAt: '2020-03-13 04:56:53',
            })

            const likedPost = await models.likedPost.create({
                postId: newPost.id,
                userId: user1.id,
                createdAt: '2021-03-13 04:56:53',
            })

            const sharedPost = await models.sharedPost.create({
                postId: newPost.id,
                userId: user1.id,
                createdAt: '2021-03-14 04:56:53',
            })

            // WHEN user 2 follows user 1
            await models.followers.create({
                followedId: user1.id,
                followerId: user2.id,
            })

            // WHEN the logged in user tries to view the feed
            let authToken = Authentication.generateAuthToken(user2)

            const response = await request('http://localhost:8000/api')
                .get(`/feed`)
                .set('Authorization', `Bearer ${authToken}`)

            // THEN their feed should display the activity of the user they follow
            const dto = await convertToPostDto(newPost)
            const expectedOutput = [
                {
                    post: dto,
                    timestamp: Date.parse(sharedPost.createdAt),
                    activity: 'SHARED',
                    userId: user1.id,
                },
                {
                    post: dto,
                    timestamp: Date.parse(likedPost.createdAt),
                    activity: 'LIKED',
                    userId: user1.id,
                },
                {
                    post: dto,
                    timestamp: Date.parse(newPost.createdAt),
                    activity: 'POSTED',
                    userId: user1.id,
                },
            ]

            expect(response.statusCode).toEqual(200)
            expect(response.body).toEqual(expectedOutput)
        })
    })

    describe('GET /notifications endpoint', () => {
        it('Should return a 200 status response and a list of notifications', async () => {
            // GIVEN two users
            const password = 'PASSWORD'
            const randomUsername1 = (Math.random() + 1)
                .toString(36)
                .substring(7)
            const email1 = `test@${randomUsername1}.com`

            const user1 = await models.users.create({
                username: randomUsername1,
                nickname: randomUsername1,
                email: email1,
                password,
            })

            const randomUsername2 = (Math.random() + 1)
                .toString(36)
                .substring(7)
            const email2 = `test@${randomUsername2}.com`

            const user2 = await models.users.create({
                username: randomUsername2,
                nickname: randomUsername2,
                email: email2,
                password,
            })

            // WHEN a user interacts with the logged in user's post
            const parent = await models.posts.create({
                text_content: 'This is a post',
                author: user1.id,
                parent: null,
            })

            const reply = await models.posts.create({
                text_content: 'This is my first reply',
                author: user2.id,
                parent: parent.id,
                createdAt: '2021-03-13 04:56:53',
            })

            const like = await models.likedPost.create({
                userId: user2.id,
                postId: parent.id,
                createdAt: '2021-03-12 04:56:53',
            })

            const share = await models.sharedPost.create({
                userId: user2.id,
                postId: parent.id,
                createdAt: '2022-03-13 04:56:53',
            })

            let authToken = Authentication.generateAuthToken(user1)

            // THEN the endpoint should return these notifications
            const response = await request('http://localhost:8000/api')
                .get(`/notifications`)
                .set('Authorization', `Bearer ${authToken}`)

            const expectedOutput = [
                {
                    type: 'share',
                    timestamp: Date.parse(share.createdAt),
                    from: share.userId,
                    post: share.postId,
                    content: null,
                },
                {
                    type: 'reply',
                    timestamp: Date.parse(reply.createdAt),
                    from: reply.author,
                    post: reply.id,
                    content: reply.text_content,
                },
                {
                    type: 'like',
                    timestamp: Date.parse(like.createdAt),
                    from: like.userId,
                    post: like.postId,
                    content: null,
                },
            ]

            expect(response.statusCode).toEqual(200)
            expect(response.body).toEqual(expectedOutput)
        })
    })

    describe('Testing followUser endpoint', () => {
        it('Should return a 201 status response for successful follow', async () => {
            // GIVEN a user
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`

            const newUser = await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
            })

            const loginInfo = {
                email,
                password,
            }

            const auth = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            const secondPassword = 'PASSWORD'
            const secondUsername = (Math.random() + 1).toString(36).substring(7)
            const secondEmail = `test@${secondUsername}.com`

            const secondUser = await models.users.create({
                username: secondUsername,
                nickname: secondUsername,
                email: secondEmail,
                password: secondPassword,
            })

            const thirdPassword = 'PASSWORD'
            const thirdUsername = (Math.random() + 1).toString(36).substring(7)
            const thirdEmail = `test@${thirdUsername}.com`

            const thirdUser = await models.users.create({
                username: thirdUsername,
                nickname: thirdUsername,
                email: thirdEmail,
                password: thirdPassword,
            })

            // first user will follow the second and third users
            const followSecond = await request('http://localhost:8000/api')
                .post(`/users/${secondUsername}/follow`)
                .set('Authorization', `Bearer ${auth.body.authToken}`)

            const followThird = await request('http://localhost:8000/api')
                .post(`/users/${thirdUsername}/follow`)
                .set('Authorization', `Bearer ${auth.body.authToken}`)

            expect(followSecond.statusCode).toEqual(201)
            expect(followSecond.body.followedId).toEqual(secondUser.id)
            expect(followSecond.body.followerId).toEqual(newUser.id)

            expect(followThird.statusCode).toEqual(201)
            expect(followThird.body.followedId).toEqual(thirdUser.id)
            expect(followThird.body.followerId).toEqual(newUser.id)
        })

        it('Should return a 409 response for trying to follow twice', async () => {
            // GIVEN a user
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`

            const newUser = await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
            })

            const loginInfo = {
                email,
                password,
            }

            const auth = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            const secondPassword = 'PASSWORD'
            const secondUsername = (Math.random() + 1).toString(36).substring(7)
            const secondEmail = `test@${secondUsername}.com`

            const secondUser = await models.users.create({
                username: secondUsername,
                nickname: secondUsername,
                email: secondEmail,
                password: secondPassword,
            })

            // first user will try to follow the second user twice
            const response = await request('http://localhost:8000/api')
                .post(`/users/${secondUsername}/follow`)
                .set('Authorization', `Bearer ${auth.body.authToken}`)

            const followAgain = await request('http://localhost:8000/api')
                .post(`/users/${secondUsername}/follow`)
                .set('Authorization', `Bearer ${auth.body.authToken}`)

            expect(response.statusCode).toEqual(201)
            expect(response.body.followedId).toEqual(secondUser.id)
            expect(response.body.followerId).toEqual(newUser.id)

            expect(followAgain.statusCode).toEqual(409)
            expect(followAgain.body.error).toEqual(
                'Already following this user'
            )
        })
    })

    describe('Testing unfollowUser endpoint', () => {
        it('Should return a 200 status response for successful deletion', async () => {
            // GIVEN a user
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`

            const newUser = await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
            })

            const loginInfo = {
                email,
                password,
            }

            const auth = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            const secondPassword = 'PASSWORD'
            const secondUsername = (Math.random() + 1).toString(36).substring(7)
            const secondEmail = `test@${secondUsername}.com`

            const secondUser = await models.users.create({
                username: secondUsername,
                nickname: secondUsername,
                email: secondEmail,
                password: secondPassword,
            })

            // first user will follow second and then unfollow him
            await request('http://localhost:8000/api')
                .post(`/users/${secondUsername}/follow`)
                .set('Authorization', `Bearer ${auth.body.authToken}`)

            const response = await request('http://localhost:8000/api')
                .delete(`/users/${secondUsername}/follow`)
                .set('Authorization', `Bearer ${auth.body.authToken}`)

            expect(response.statusCode).toEqual(200)
            expect(response.body.followedId).toEqual(secondUser.id)
            expect(response.body.followerId).toEqual(newUser.id)
        })

        it('Should return a 404 response for trying to unfollow a not followed user', async () => {
            // GIVEN a user
            const password = 'PASSWORD'
            const randomUsername = (Math.random() + 1).toString(36).substring(7)
            const email = `test@${randomUsername}.com`

            await models.users.create({
                username: randomUsername,
                nickname: randomUsername,
                email,
                password,
            })

            const loginInfo = {
                email,
                password,
            }

            const auth = await request('http://localhost:8000/api')
                .post('/users/authenticate')
                .send(loginInfo)

            const secondPassword = 'PASSWORD'
            const secondUsername = (Math.random() + 1).toString(36).substring(7)
            const secondEmail = `test@${secondUsername}.com`

            await models.users.create({
                username: secondUsername,
                nickname: secondUsername,
                email: secondEmail,
                password: secondPassword,
            })

            const response = await request('http://localhost:8000/api')
                .delete(`/users/${secondUsername}/follow`)
                .set('Authorization', `Bearer ${auth.body.authToken}`)

            expect(response.statusCode).toEqual(404)
            expect(response.body.error).toEqual(
                'Already not following this user'
            )
        })
    })

    describe('POST /posts/:id/share', () => {
        describe('when not authenticated', () => {
            it('should return response code of 400', async () => {
                const response = await request(server).post(
                    '/api/posts/1/share'
                )
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when the post does not exist', () => {
            it('should return response code of 404', async () => {
                const user1 = await models.users.create({
                    username: 'gandalf',
                    nickname: 'gandalf',
                    email: 'gandalf@gandalf.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const newPost = await models.posts.create({
                    text_content: 'Test text',
                    author: user1.id,
                    parent: null,
                })

                const response = await request(server)
                    .post(`/api/posts/${newPost.id + 99}/share`)
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.statusCode).toBe(404)
            })
        })

        describe('when a valid user is sharing a post that exists', () => {
            it('should return response code of 201', async () => {
                const user1 = await models.users.create({
                    username: 'gandalf',
                    nickname: 'gandalf',
                    email: 'gandalf@gandalf.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const newPost = await models.posts.create({
                    text_content: 'Test text',
                    author: user1.id,
                    parent: null,
                })

                const response = await request(server)
                    .post(`/api/posts/${newPost.id}/share`)
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.statusCode).toBe(201)
            })
        })
    })

    describe('GET /users/:username/follow', () => {
        describe('when not authenticated', () => {
            it('should return response code of 400', async () => {
                const response = await request(server).get(
                    '/api/users/someuser/follow'
                )
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when user tries to check other accounts followings (allowed)', () => {
            it('should return response code of 403', async () => {
                const user1 = await models.users.create({
                    username: 'gandalf',
                    nickname: 'gandalf',
                    email: 'gandalf@gandalf.com',
                    password: 'password',
                })
                const user2 = await models.users.create({
                    username: 'gandalf_2',
                    nickname: 'gandalf_2',
                    email: 'gandalf_2@gandalf.com',
                    password: 'password_2',
                })
                const authToken = Authentication.generateAuthToken(user1)

                const response = await request(server)
                    .get(`/api/users/${user2.username}/follow`)
                    .set('Authorization', `Bearer ${authToken}`)

                const expectedOutput = {
                    following: [],
                    followers: [],
                }
                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual(expectedOutput)
            })
        })

        describe('when user correctly checked thier followers but has no followers nor follwings', () => {
            it('should return response code of 200', async () => {
                const randomUsername = (Math.random() + 1)
                    .toString(36)
                    .substring(7)
                const user1 = await models.users.create({
                    username: randomUsername,
                    nickname: randomUsername,
                    email: `${randomUsername}@gandalf.com`,
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const response = await request(server)
                    .get(`/api/users/${user1.username}/follow`)
                    .set('Authorization', `Bearer ${authToken}`)

                const expectedOutput = {
                    following: [],
                    followers: [],
                }
                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual(expectedOutput)
            })
        })

        describe('when user correctly checked thier followers (has followers and followings)', () => {
            it('should return response code of 200', async () => {
                async function createRandomUser() {
                    const randomUsername = (Math.random() + 1)
                        .toString(36)
                        .substring(7)
                    const user = await models.users.create({
                        username: randomUsername,
                        nickname: randomUsername,
                        email: `${randomUsername}@gandalf.com`,
                        password: 'password',
                        bio: null,
                        profileBanner: null,
                        profilePic: null,
                    })
                    return user
                }

                const user1 = await createRandomUser()
                const user2 = await createRandomUser()
                const user3 = await createRandomUser()

                async function createFollowers(followedId, followerId) {
                    const follower = await models.followers.create({
                        followedId: followedId,
                        followerId: followerId,
                    })
                }

                await createFollowers(user1.id, user2.id)
                await createFollowers(user1.id, user3.id)
                await createFollowers(user2.id, user1.id)

                const authToken = Authentication.generateAuthToken(user1)

                const response = await request(server)
                    .get(`/api/users/${user1.username}/follow`)
                    .set('Authorization', `Bearer ${authToken}`)

                const expectedOutput = {
                    following: [await UserDTO.convertToDto(user2)],
                    followers: [
                        await UserDTO.convertToDto(user2),
                        await UserDTO.convertToDto(user3),
                    ],
                }
                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual(expectedOutput)
            })
        })
    })

    describe('when modifying user profile in a valid way', () => {
        it('should return response code of 200', async () => {
            const user1 = await models.users.create({
                username: 'testUser1',
                nickname: 'gandalf1',
                email: 'testUser@tesmail.com',
                password: 'password',
                bio: 'test user: gandalf',
                profilePic: 'linktoPic',
                profileBanner: 'profileBanner',
            })

            const user2 = { username: 'newtestUser',
                            nickname: 'newNickname',
                            bio: 'test user: newGandalf',
                            profilePic: 'newLinktoPic',
                            profileBanner: 'newprofileBanner'
            }

            const authToken = Authentication.generateAuthToken(user1)

            const response = await request(server)
                .put('/api/users/')
                .set('Authoriation', `Bearer ${authToken}`)
                .send(user2)

            expect(response.body.username).toBe(user2.username)
            expect(response.body.nickname).toBe(user2.nickname)
            expect(response.body.bio).toBe(user2.bio)
            expect(response.body.profilePic).toBe(user2.profilePic)
            expect(response.body.profileBanner).toBe(user2.profileBanner)
            expect(response.statusCode).toBe(200)
        })
    })

    describe('when modifying user profile in a invalid way', () => {
        it('should return response code of 401', async () => {
            const user1 = await models.users.create({
                username: 'testUser1',
                nickname: 'gandalf1',
                email: 'testUser@tesmail.com',
                password: 'password',
                bio: 'test user: gandalf',
                profilePic: 'linktoPic',
                profileBanner: 'profileBanner',
            })

            const user2 = { username: 'newtestUser',
                            nickname: 'newNickname',
                            bio: 'test user: newGandalf',
                            profilePic: 'newLinktoPic',
                            profileBanner: 'newprofileBanner'
            }

            const authToken = Authentication.generateAuthToken(user1)

            const response = await request(server)
                .put('/api/users/')
                .send(user2)

            expect(response.statusCode).toBe(401)
        })
    })

    describe('when deleting user profile', () => {
        it('should return response code of 200', async () => {
            const user1 = await models.users.create({
                username: 'testUser1',
                nickname: 'gandalf1',
                email: 'testUser@tesmail.com',
                password: 'password',
                bio: 'test user: gandalf',
                profilePic: 'linktoPic',
                profileBanner: 'profileBanner',
            })

            const authToken = Authentication.generateAuthToken(user1)

            const response = await request(server)
                .delete('/api/users/')

            expect(response.body).toBe('The user has been deleted.')
            expect(response.statusCode).toBe(200)
        })
    })

    afterAll(() => {
        models.sequelize.close()
        serverInstance.close()
    })
})
