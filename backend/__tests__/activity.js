import Activity from '../enums/activity'
import { ActivityType } from '../enums/activity'
import models from '../database/models'
import Helper from './helper/helper'

describe('Activity', () => {
  describe('getUserActivities', () => {
    it('should retrieve all user activities from newest to oldest', async () => {
      const u1 = await Helper.createUser()
      const u2 = await Helper.createUser()
      const p1 = await Helper.createPost('u1 test post', u1.id)
      await Helper.likePost(p1.id, u2.id)
      await Helper.createPost('u2 test post', u2.id)
      const activities = await Activity.getUserActivities(u2.id)
      expect(activities.length).toEqual(2)
      expect(activities[0].activity).toEqual(ActivityType.POSTED.type)
      expect(activities[1].activity).toEqual(ActivityType.LIKED.type)
    })
  })
  describe('retrieveActivityFeed', () => {
    it('should retrieve a feed of activity from all followed users', async () => {
      const u1 = await Helper.createUser()
      const u2 = await Helper.createUser()
      const u3 = await Helper.createUser()
      await Helper.createFollowers(u2.id, u1.id)
      await Helper.createFollowers(u3.id, u1.id)

      await Helper.createPost('u2 post 1', u2.id)
      const p2 = await Helper.createPost('u3 post 1', u3.id)
      await Helper.createPost('u2 post 2', u2.id)
      // Needs a long enough wait or it all happens at the same timestamp
      await new Promise((r) => setTimeout(r, 1000))
      await Helper.likePost(p2.id, u2.id)

      const following = await models.followers.findAll({
        where: {
          followerId: u1.id,
        },
      })
      const feed = await Activity.retrieveActivityFeed(following)
      expect(feed.length).toEqual(4)
      expect(feed[0].activity).toEqual(ActivityType.LIKED.type)
    })
  })
})
