import request from 'supertest'
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
            const createUserResponse = await request(server)
                .post('/api/users')
                .send({
                    username: 'testUser',
                    email: 'testUser@testmail.com',
                    password: 'password',
                })

            const authResponse = await request(server)
                .post('/api/users/authenticate')
                .send({
                    id: createUserResponse.body.id,
                })

            const response = await request(server)
                .post('/api/posts')
                .set('Authorization', `Bearer ${authResponse.body.authToken}`)
                .send({
                    text_content: 'some random text 2',
                    parent: null,
                })
            expect(response.statusCode).toBe(201)
        })
    })

    // the parent must exist for it to be a valid post.
    describe('when creating an invalid post', () => {
        it('should return response code of 404 not found', async () => {
            const createUserResponse = await request(server)
                .post('/api/users')
                .send({
                    username: 'testUser',
                    email: 'testUser@testmail.com',
                    password: 'password',
                })

            const authResponse = await request(server)
                .post('/api/users/authenticate')
                .send({
                    id: createUserResponse.body.id,
                })

            const response = await request(server)
                .post('/api/posts')
                .set('Authorization', `Bearer ${authResponse.body.authToken}`)
                .send({
                    text_content: 'some random text 2',
                    parent: 99999,
                })
            expect(response.statusCode).toBe(404)
        })
    })
})

describe('GET /posts', () => {
    describe('when the post id can not be found', () => {})

    describe('when the post id can be found', () => {})
})

describe('PUT /posts', () => {
    describe('when not authenticated', () => {})

    describe('when auth token is invalid', () => {})

    describe('when the post id can not be found', () => {})

    describe('when the author is invalid', () => {})

    describe('when modifying a post in a valid way', () => {})

    /* 
    the parent must exist for it to be a valid post.
    the datatypes for the other message body fields must be correct.
    */
    describe('when modifying a post in an invalid way', () => {})
})

describe('DELETE /posts', () => {
    describe('when not authenticated', () => {})

    describe('when auth token is invalid', () => {})

    describe('when the post id can not be found', () => {})

    describe('when the author is invalid', () => {})

    describe('when deleting a leaf post', () => {})

    /*
    Child posts need to get deleted along with the parent post.
    */
    describe('when deleting a parent post', () => {})
})
