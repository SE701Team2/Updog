import { Router } from 'express'

import { user, posts, image, test } from '../controllers'

const router = Router()

/*
USERS
*/
router
  .route('/users')
  .post(user.addUser)
  .put(user.modifyUser)
  .delete(user.deleteUser)

router.route('/users/:username').get(user.getUsersByUsername)

router.route('/users/authenticate').post(user.authenticateUser)

router.route('/users/:username/activity').get(user.getUserActivity)

router
  .route('/users/:username/follow')
  .post(user.followUser)
  .delete(user.unfollowUser)
  .get(user.getFollow)

router.route('/feed').get(user.getFeed)

router.route('/notifications').get(user.getNotifications)

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

router.route('/posts/:id/interactions').get(posts.getInteractedUsers)

/*
IMAGES
*/

router.route('/images').post(image.uploadImage)
router.route('/images/:filename').get(image.getImage)

/*
TESTING
*/
router.route('/test').get(test.helloWorld)

export default router
