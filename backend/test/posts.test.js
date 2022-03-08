describe('POST /posts', () => {
    describe('when not authenticated', () => {})

    describe('when auth token is invalid', () => {})

    describe('when creating a valid post', () => {})

    // the parent must exist for it to be a valid post.
    describe('when creating an invalid post', () => {})
})

describe('GET /posts', () => {
    describe('when the post id can not be found', () => {})

    describe('when the post id can be found', () => {})
})

describe('PUT /posts', () => {
    describe('when not authenticated', () => {})

    describe('when auth token is invalid', () => {})

    describe('when the post id can not be found', () => {})

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

    describe('when deleting a leaf post', () => {})

    /*
    Child posts need to get deleted along with the parent post.
    */
    describe('when deleting a parent post', () => {})
})
