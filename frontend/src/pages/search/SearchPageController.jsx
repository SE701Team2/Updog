import SearchPageView from './SearchPageView'
import useApi from '../../hooks/useApi'
import LoadingView from '../loading/LoadingView'

/**
 * This page renders the search UI.
 */
const SearchPageController = () => {
  const { data, loading, err } = useApi(`search`)

  if (data) {
    return <div>Data... </div>
  }

  if (loading) {
    return <LoadingView />
  }

  if (err) {
    return <div>Error: {err}</div>
  }

  return <SearchPageView />
}

export default SearchPageController
