import { Router } from 'express'
import { user, posts, test, interests, tags, search } from '../controllers'

const router = Router()

/*
USERS
*/
router
  .route('/users')
  .get(user.getUserHandles)
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
INTERESTS
*/
router
  .route('/interests')
  .get(interests.getInterests)
  .post(interests.addInterests)
  .delete(interests.deleteInterests)

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
TAGS
*/
router.route('/tags').post(tags.createTag).get(tags.getTags)

/*
SEARCH
*/
router.route('/search').get(search.search)

/*
TESTING
*/
router.route('/test').get(test.helloWorld)

export default router
