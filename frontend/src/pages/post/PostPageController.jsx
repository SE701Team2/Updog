import { useParams } from "react-router-dom"
import PostPageView from "./PostPageView"
import postData from './mock-data'

/**
 * This page renders a single post and its replies. It also contains
 * a header and the navigation footer.
 */
const PostPageController = () => {
    // gets the id from the current url 
    const { id } = useParams()

    // for mock purposes only, will need to fetch post from id 
    // need to add logic for checking if id is a valid number
    postData.id = parseInt(id, 10)

    return <PostPageView postData={postData} />
}

export default PostPageController
