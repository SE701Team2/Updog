import request from 'supertest'
import server from '../server/index'
import models from '../database/models'
import { Authentication } from '../middlewares/authentication'

describe('Posts', () => {
    describe('POST /posts', () => {
        describe('when not authenticated', () => {
            it('should return response code of 400', async () => {
                const response = await request(server).post('/api/posts').send({
                    text_content: 'some random text',
                    parent: null,
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when creating a valid post', () => {
            it('should return response code of 200', async () => {
                const user1 = await models.users.create({
                    username: 'gandalf',
                    nickname: 'gandalf',
                    email: 'gandalf@gandalf.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const response = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'what is the meaning of life?',
                        parent: null,
                    })
                expect(response.body.id).toBeTruthy()
                expect(response.body.content).toBe(
                    'what is the meaning of life?'
                )
                expect(response.body.author.username).toBe('gandalf')
                expect(response.body.author.email).toBe('gandalf@gandalf.com')
                expect(response.body.parent).toBe(null)
                expect(response.body.children).toStrictEqual([])
                expect(response.body.usersLiked).toBe(0)
                expect(response.body.usersShared).toBe(0)
                expect(response.body.timestamp).toBeTruthy()
                expect(response.statusCode).toBe(201)
            })
        })

        describe('when creating a valid post with attachment', () => {
            it('should return response code of 200', async () => {
                const user1 = await models.users.create({
                    username: 'gandalf',
                    nickname: 'gandalf',
                    email: 'gandalf@gandalf.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const fs = require('fs')
                const testFile = fs.readFile(
                    '__tests__/files/test_image.png',
                    (err) => {
                        if (err) {
                            throw err
                        }
                    }
                )
                const response = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 3',
                        parent: null,
                        attachments: testFile,
                    })
                expect(response.statusCode).toBe(201)
            })
        })

        // the parent must exist for it to be a valid post.
        describe('when creating an invalid post', () => {
            it('should return response code of 404 not found', async () => {
                const user1 = await models.users.create({
                    username: 'testUser',
                    nickname: 'gandalf',
                    email: 'testUser@testmail.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const invalidId = createPostResponse.body.id + 999

                const response = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: invalidId,
                    })
                expect(response.statusCode).toBe(404)
            })
        })

        describe('when user like post in a valid way', () => {
            it('should return response code of 201', async () => {
                const user1 = await models.users.create({
                    username: 'gandalf',
                    nickname: 'gandalf',
                    email: 'gandalf@gandalf.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const response = await request(server)
                    .post(`/api/posts/${createPostResponse.body.id}/like`)
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.statusCode).toBe(201)
            })
        })

        describe('when user try to like post that does not exist', () => {
            it('should return response code of 404', async () => {
                const user1 = await models.users.create({
                    username: 'gandalf',
                    nickname: 'gandalf',
                    email: 'gandalf@gandalf.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const invalidId = createPostResponse.body.id + 999

                const response = await request(server)
                    .put(`/api/posts/${invalidId}/like`)
                    .set('Authorization', `Bearer ${authToken}`)
                expect(response.statusCode).toBe(404)
            })
        })
    })

    describe('GET /posts', () => {
        describe('when the post id can not be found', () => {
            it('should return 404 not found response code', async () => {
                const user1 = await models.users.create({
                    username: 'testUser',
                    nickname: 'gandalf',
                    email: 'testUser@testmail.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const invalidId = createPostResponse.body.id + 999

                const response = await request(server).get(
                    `/api/posts/${invalidId}`
                )
                expect(response.statusCode).toBe(404)
            })
        })

        describe('when the post id can be found', () => {
            it('should return 200 ok response code', async () => {
                const user1 = await models.users.create({
                    username: 'testUser',
                    nickname: 'gandalf',
                    email: 'testUser@testmail.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const response = await request(server).get(
                    `/api/posts/${createPostResponse.body.id}`
                )
                expect(response.body.id).toBeTruthy()
                expect(response.body.content).toBe('some random text 2')
                expect(response.body.author.username).toBe('testUser')
                expect(response.body.author.email).toBe('testUser@testmail.com')
                expect(response.body.parent).toBe(null)
                expect(response.body.children).toStrictEqual([])
                expect(response.body.usersLiked).toBe(0)
                expect(response.body.usersShared).toBe(0)
                expect(response.body.timestamp).toBeTruthy()
                expect(response.statusCode).toBe(200)
            })
        })
    })

    describe('PUT /posts', () => {
        describe('when not authenticated', () => {
            it('should return response code of 400', async () => {
                const response = await request(server)
                    .put(`/api/posts/1`)
                    .send({
                        text_content: 'new text',
                        parent: null,
                    })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when the post id can not be found', () => {
            it('should return response code of 404', async () => {
                const user1 = await models.users.create({
                    username: 'testUser',
                    nickname: 'gandalf',
                    email: 'testUser@testmail.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const invalidId = createPostResponse.body.id + 999

                const response = await request(server)
                    .put(`/api/posts/${invalidId}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'new text',
                        parent: null,
                    })
                expect(response.statusCode).toBe(404)
            })
        })

        describe('when the author is invalid', () => {
            it('should return response code of 403', async () => {
                const user1 = await models.users.create({
                    username: 'testUser1',
                    nickname: 'gandalf',
                    email: 'testUser1@testmail.com',
                    password: 'password',
                })

                const user2 = await models.users.create({
                    username: 'testUser2',
                    nickname: 'gandalf',
                    email: 'testUser2@testmail.com',
                    password: 'password',
                })

                const authToken1 = Authentication.generateAuthToken(user1)

                const authToken2 = Authentication.generateAuthToken(user2)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken1}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const response = await request(server)
                    .put(`/api/posts/${createPostResponse.body.id}`)
                    .send({
                        text_content: 'new text',
                        parent: null,
                    })
                    .set('Authorization', `Bearer ${authToken2}`)
                expect(response.statusCode).toBe(403)
            })
        })

        describe('when modifying a post in a valid way', () => {
            it('should return response code of 200', async () => {
                const user1 = await models.users.create({
                    username: 'testUser',
                    nickname: 'gandalf',
                    email: 'testUser@testmail.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const response = await request(server)
                    .put(`/api/posts/${createPostResponse.body.id}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'new text',
                        parent: null,
                    })
                expect(response.statusCode).toBe(200)
            })
        })

        /*
        the parent must exist for it to be a valid post.
        the datatypes for the other message body fields must be correct.
        */
        describe('when modifying a post in an invalid way', () => {})
    })

    describe('DELETE /posts', () => {
        describe('when not authenticated', () => {
            it('should return response code of 400', async () => {
                const response = await request(server).delete(`/api/posts/1`)
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when the post id can not be found', () => {
            it('should return response code of 404', async () => {
                const user1 = await models.users.create({
                    username: 'testUser',
                    nickname: 'gandalf',
                    email: 'testUser@testmail.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const invalidId = createPostResponse.body.id + 999

                const response = await request(server)
                    .delete(`/api/posts/${invalidId}`)
                    .set('Authorization', `Bearer ${authToken}`)
                expect(response.statusCode).toBe(404)
            })
        })

        describe('when the author is invalid', () => {
            it('should return response code of 403', async () => {
                const user1 = await models.users.create({
                    username: 'testUser1',
                    nickname: 'gandalf',
                    email: 'testUser1@testmail.com',
                    password: 'password',
                })

                const user2 = await models.users.create({
                    username: 'testUser2',
                    nickname: 'gandalf',
                    email: 'testUser2@testmail.com',
                    password: 'password',
                })

                const authToken1 = Authentication.generateAuthToken(user1)

                const authToken2 = Authentication.generateAuthToken(user2)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken1}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const response = await request(server)
                    .delete(`/api/posts/${createPostResponse.body.id}`)
                    .set('Authorization', `Bearer ${authToken2}`)
                expect(response.statusCode).toBe(403)
            })
        })

        describe('when deleting a leaf post', () => {
            it('should return response code of 200', async () => {
                const user1 = await models.users.create({
                    username: 'testUser',
                    nickname: 'gandalf',
                    email: 'testUser@testmail.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const response = await request(server)
                    .delete(`/api/posts/${createPostResponse.body.id}`)
                    .set('Authorization', `Bearer ${authToken}`)
                expect(response.statusCode).toBe(200)
            })
        })

        describe('when user unlike post in a valid way', () => {
            it('should return response code of 201', async () => {
                const user1 = await models.users.create({
                    username: 'gandalf',
                    nickname: 'gandalf',
                    email: 'gandalf@gandalf.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const likePostresponse = await request(server)
                    .post(`/api/posts/${createPostResponse.body.id}/like`)
                    .set('Authorization', `Bearer ${authToken}`)

                const response = await request(server)
                    .delete(`/api/posts/${createPostResponse.body.id}/like`)
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.statusCode).toBe(200)
            })
        })

        describe('when user try to unlike post that has not been liked', () => {
            it('should return response code of 404', async () => {
                const user1 = await models.users.create({
                    username: 'gandalf',
                    nickname: 'gandalf',
                    email: 'gandalf@gandalf.com',
                    password: 'password',
                })

                const authToken = Authentication.generateAuthToken(user1)

                const createPostResponse = await request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        text_content: 'some random text 2',
                        parent: null,
                    })

                const response = await request(server)
                    .delete(`/api/posts/${createPostResponse.body.id}/like`)
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.statusCode).toBe(500)
            })
        })

        /*
        Child posts need to get deleted along with the parent post.
        */
        describe('when deleting a parent post', () => {})
    })
})
