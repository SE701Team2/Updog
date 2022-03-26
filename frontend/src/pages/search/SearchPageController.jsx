import SearchPageView from './SearchPageView'
import useApi from '../../hooks/useApi'

/**
 * This page renders the search UI.
 */
const SearchPageController = () => {
  const { data, loading, err } = useApi(`search`)

  if (data) {
    return <div>Data... </div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (err) {
    return <div>Error: {err}</div>
  }

  return <SearchPageView />
}

export default SearchPageController
