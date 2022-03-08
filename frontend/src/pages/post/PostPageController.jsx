import { useParams } from "react-router-dom"
import { PostPageView } from "./PostPageView"

export const PostPageController = () => {
    const { id } = useParams()
    return <PostPageView id={id} />
}