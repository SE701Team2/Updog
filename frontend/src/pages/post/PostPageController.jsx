import { useParams } from "react-router-dom"
import PostPageView from "./PostPageView"

/**
 * This page renders a single post and its replies. It also contains
 * a header and the navigation footer.
 */
const PostPageController = () => {
    // gets the id from the current url 
    const { id } = useParams()

    return <PostPageView id={id} />
}

export default PostPageController
