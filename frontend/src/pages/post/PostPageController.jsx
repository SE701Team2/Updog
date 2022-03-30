import { useParams } from 'react-router-dom'
import PostPageView from './PostPageView'
import LoadingView from '../loading/LoadingView'
import useApi from '../../hooks/useApi'

/**
 * This page renders a single post and its replies. It also contains
 * a header and the navigation footer.
 */
const PostPageController = () => {
  // gets the id from the current url
  const { id } = useParams()
  const { data, loading, err } = useApi(`posts/${id}`)

  if (loading) {
    return <LoadingView />
  }

  if (err) {
    return <div>Error: {err}</div>
  }

  return <PostPageView postData={data} />
}

export default PostPageController
