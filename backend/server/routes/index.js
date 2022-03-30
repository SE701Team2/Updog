import { Router } from 'express'
import {
  user,
  posts,
  test,
  image,
  interests,
  tags,
  search,
} from '../controllers'
const auth = require('../../middlewares/auth')

const router = Router()

/*
USERS
*/
router
  .route('/users')
  .get(auth, user.getUserHandles)
  .post(user.addUser)
  .put(auth, user.modifyUser)
  .delete(auth, user.deleteUser)

router.route('/users/:username').get(auth, user.getUsersByUsername)

router.route('/users/authenticate').post(user.authenticateUser)

router.route('/users/:username/activity').get(auth, user.getUserActivity)

router
  .route('/users/:username/follow')
  .post(auth, user.followUser)
  .delete(auth, user.unfollowUser)
  .get(auth, user.getFollow)

router.route('/feed').get(auth, user.getFeed)

router.route('/notifications').get(auth, user.getNotifications)

/*
INTERESTS
*/
router
  .route('/interests')
  .get(auth, interests.getInterests)
  .post(auth, interests.addInterests)
  .delete(auth, interests.deleteInterests)

/*
POSTS
*/
router.route('/posts').post(auth, posts.createPost)

router
  .route('/posts/:id')
  .get(posts.getPostById)
  .put(auth, posts.modifyPostById)
  .delete(auth, posts.deletePostById)

router
  .route('/posts/:id/like')
  .post(auth, posts.likePost)
  .delete(auth, posts.unlikePost)

router
  .route('/posts/:id/share')
  .post(auth, posts.sharePostById)
  .delete(auth, posts.unsharePostById)

router.route('/posts/:id/interactions').get(auth, posts.getInteractedUsers)

/*
IMAGES
*/

router.route('/images').post(image.uploadImage)
router.route('/images/:filename').get(image.getImage)

/*
TAGS
*/
router.route('/tags').post(auth, tags.createTag).get(auth, tags.getTags)

/*
SEARCH
*/
router.route('/search').get(search.search)

/*
TESTING
*/
router.route('/test').get(test.helloWorld)

export default router
