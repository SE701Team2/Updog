import { Router } from 'express'

import { user, posts, test } from '../controllers'

const router = Router()

/*
USERS
*/
router.route('/users').post(user.addUser)

router.route('/users/:username').get(user.getUsersByUsername)

router.route('/users/authenticate').post(user.authenticateUser)

router.route('/users/:username/activity').get(user.getUserActivity)

/*
POSTS
*/
router.route('/posts').post(posts.createPost)

router
    .route('/posts/:id')
    .get(posts.getPostById)
    .put(posts.modifyPostById)
    .delete(posts.deletePostById)

router.route('/posts/:id/like').post(posts.likePost).delete(posts.unlikePost)

router
    .route('/posts/:id/share')
    .post(posts.sharePostById)
    .delete(posts.unsharePostById)

/*
TESTING
*/
router.route('/test').get(test.helloWorld)

export default router
