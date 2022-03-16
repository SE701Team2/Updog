import {Activity} from "../enums/activity";

describe('Activity', () => {
    describe('convertToActivity', () => {
        it('should return it in the correct format', () => {
          const postId = 1
          const updatedAt = "2021-03-13 04:56:53"

          const expectedOutput = {
              postID: postId,
              timestamp: Date.parse(updatedAt),
              activity: "LIKED"
          }

          let actual = Activity.convertToActivity(Activity.LIKED, postId, updatedAt);
          expect(actual).toEqual(expectedOutput)
        })
    })
});