import { Router } from 'express'

import { user, posts, test } from '../controllers'

const router = Router()

/*
USERS
*/
router.route('/users').post(user.addUser)

router.route('/users/:id').get(user.getUsersById)

/*
POSTS
*/
router.route('/posts').post(posts.createPost)

router.route('/posts/:id').get(posts.getPostById)

router.route('/posts/:id').put(posts.modifyPostById)

router.route('/posts/:id').delete(posts.deletePostById)

/*
TESTING
*/
router.route('/test').get(test.helloWorld)

export default router
