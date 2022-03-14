export class Activity {
    static POSTED = new Activity('POSTED');
    static LIKED= new Activity('LIKED');
    static SHARED = new Activity('SHARED');

    constructor(type) {
        this.type = type;
    }

     static convertToActivity(activity, postId, postTime) {
        return {
            postID: postId,
            timestamp: Date.parse(postTime),
            activity: activity.type
        }
    }
}