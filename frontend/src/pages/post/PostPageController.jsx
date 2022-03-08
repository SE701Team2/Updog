import { PostPageView } from "./PostPageView"
import { post } from './post.mock.js'

export const PostPageController = () => {
    // when db / store is implemented, use const { id } = useParams() to get the id from url,
    // then use the id to fetch the post data.
    return <PostPageView post={post} />
}