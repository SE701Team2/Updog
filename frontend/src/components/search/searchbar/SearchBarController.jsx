import SearchBarView from './SearchBarView'

/**
 * SearchBarController for handling the search element and handling as text is entered and submitted
 *
 * @param {string} initialText
 * @param {function} handleSubmit
 */
const SearchBarController = ({ initialText, handleSubmit }) => (
  <SearchBarView initialText={initialText} handleSubmit={handleSubmit} />
)

export default SearchBarController
