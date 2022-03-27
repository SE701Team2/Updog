import request from 'supertest'
import server from '../server/index'
import Helper from './helper/helper'

const assert = require('assert')

describe('Search', () => {
  describe('GET /search', () => {
    describe('When searching for an existing user', () => {
      it('Should return a 200 status response', async () => {
        const user = await Helper.createUser(
          'Pete Davidson',
          'password',
          'pete@gmail.com'
        )

        const response = await request(server)
          .get('/api/search/')
          .query({ query: 'Pete', type: 'people' })

        assert.equal(response.statusCode, 200)
        expect(response.body[0].id).toBe(user.id)
        expect(response.body[0].username).toBe(user.username)
      })
    })

    describe('When searching for existing users with similiar names', () => {
      it('Should return a 200 status response', async () => {
        const user1 = await Helper.createUser(
          'Pink Unicorn',
          'password',
          'pink.unicorn@gmail.com'
        )
        const user2 = await Helper.createUser(
          'Green Unicorn',
          'password',
          'green.unicorn@gmail.com'
        )

        const response = await request(server)
          .get('/api/search/')
          .query({ query: 'Unicorn', type: 'people' })

        assert.equal(response.statusCode, 200)
        expect(response.body[0].id).toBe(user1.id)
        expect(response.body[0].username).toBe(user1.username)
        expect(response.body[1].id).toBe(user2.id)
        expect(response.body[1].username).toBe(user2.username)
      })
    })

    describe('When searching for non-existing user', () => {
      it('Should return a 200 status response', async () => {
        const response = await request(server)
          .get('/api/search/')
          .query({ query: 'abcdefgh', type: 'people' })

        assert.equal(response.statusCode, 200)
        assert.equal(response.body.length, 0)
      })
    })

    describe('When searching for an existing post', () => {
      it('Should return a 200 status response', async () => {
        const user = await Helper.createUser(
          'Kim Kardashian',
          'password',
          'kim.kardashian@gmail.com'
        )

        const earlyPost = await Helper.createPost(
          'Hi my name is Kim Kardashian West',
          user.id,
          null,
          '2021-03-13 04:56:53'
        )
        const laterPost = await Helper.createPost(
          'Hi my name is Kim Kardashian',
          user.id,
          null,
          '2021-03-13 04:57:00'
        )

        const response = await request(server)
          .get('/api/search/')
          .query({ query: 'Kim', type: 'latest' })

        assert.equal(response.statusCode, 200)
        expect(response.body[0].id).toBe(laterPost.id)
        expect(response.body[0].content).toBe(laterPost.text_content)
        expect(response.body[1].id).toBe(earlyPost.id)
        expect(response.body[1].content).toBe(earlyPost.text_content)
      })
    })

    describe('When searching for existing top posts', () => {
      it('Should return a 200 status response', async () => {
        const user1 = await Helper.createUser(
          'Taylor Swift',
          'password',
          'taylor.swift@gmail.com'
        )
        const user2 = await Helper.createUser(
          'Olivia Rodrigo',
          'password',
          'olivia.rodrigo@gmail.com'
        )

        const mostLikedPost = await Helper.createPost(
          'I am very tired',
          user1.id,
          null,
          '2021-03-13 04:56:53'
        )
        const leastLikedPost = await Helper.createPost(
          'I am tired',
          user1.id,
          null,
          '2021-03-13 04:57:00'
        )

        await Helper.likePost(mostLikedPost.id, user2.id)

        const response = await request(server)
          .get('/api/search/')
          .query({ query: 'tired', type: 'top' })

        assert.equal(response.statusCode, 200)
        expect(response.body[0].id).toBe(mostLikedPost.id)
        expect(response.body[0].content).toBe(mostLikedPost.text_content)
        expect(response.body[1].id).toBe(leastLikedPost.id)
        expect(response.body[1].content).toBe(leastLikedPost.text_content)
      })
    })

    describe('When searching for non-existing posts', () => {
      it('Should return a 200 status response', async () => {
        const response = await request(server)
          .get('/api/search/')
          .query({ query: 'wefhnrkevgkdsnv', type: 'top' })

        assert.equal(response.statusCode, 200)
        assert.equal(response.body.length, 0)
      })
    })

    describe('When searching with missing query', () => {
      it('Should return a 400 Bad Request status response', async () => {
        const response = await request(server).get('/api/search/')

        assert.equal(response.statusCode, 400)
      })
    })
  })
})
