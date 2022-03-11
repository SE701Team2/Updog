import request from 'supertest'
import { fs } from 'fs'
import server from '../server/index'
import models from '../database/models'
import { Authentication } from '../middlewares/authentication'

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
                username: 'testUser',
                email: 'testUser@testmail.com',
                password: 'password',
            })

            const authToken = Authentication.generateAuthToken(user1)

            const response = await request(server)
                .post('/api/posts')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    text_content: 'some random text 2',
                    parent: null,
                })
            expect(response.statusCode).toBe(201)
        })
    })

    describe('when creating a valid post with attachment', () => {
        it('should return response code of 200', async () => {
            const user1 = await models.users.create({
                username: 'testUser',
                email: 'testUser@testmail.com',
                password: 'password',
            })

            const authToken = Authentication.generateAuthToken(user1)

            const response = await request(server)
                .post('/api/posts')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    text_content: 'some random text 3',
                    parent: null,
                    attachments: fs.readFile('files/test_image.png.png', null),
                })
            expect(response.statusCode).toBe(201)
        })
    })

    // the parent must exist for it to be a valid post.
    describe('when creating an invalid post', () => {
        it('should return response code of 404 not found', async () => {
            const user1 = await models.users.create({
                username: 'testUser',
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
})

describe('GET /posts', () => {
    describe('when the post id can not be found', () => {
        it('should return 404 not found response code', async () => {
            const user1 = await models.users.create({
                username: 'testUser',
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
            expect(response.statusCode).toBe(200)
        })
    })
})

describe('PUT /posts', () => {
    describe('when not authenticated', () => {
        it('should return response code of 400', async () => {
            const response = await request(server).put(`/api/posts/1`).send({
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
                email: 'testUser1@testmail.com',
                password: 'password',
            })

            const user2 = await models.users.create({
                username: 'testUser2',
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
                email: 'testUser1@testmail.com',
                password: 'password',
            })

            const user2 = await models.users.create({
                username: 'testUser2',
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

    /*
    Child posts need to get deleted along with the parent post.
    */
    describe('when deleting a parent post', () => {})
})
