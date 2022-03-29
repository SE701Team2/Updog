/**
 * processWord - Process a single word to check if it is a tag or handle
 * Add custom styling if is a tag or handle
 * @param {[string]} tags
 * @param {[string]} handles
 * @param {classname} tagStyle styles for tags
 * @param {classname} handleStyle styles for handles
 * @returns
 */
const processWord = (tags, handles, tagStyle, handleStyle) => (exactWord) => {
  // Remove &nbsp; from checks
  const word = exactWord.replaceAll('&nbsp;', '')
  if (word.startsWith('#')) {
    // Check for hashtags
    const tag = tags.find((t) => t.name === word.slice(1))
    if (tag) {
      // TODO - route to search with query parameter
      return `<a href="/search?query=#${tag.name}" class="${tagStyle}">${exactWord}</a>`
    }
  }

  if (word.startsWith('@')) {
    // Check for mentions
    const handle = handles.find((h) => h.name === word.slice(1))
    if (handle) {
      return `<a href="/user/${handle.name}" class="${handleStyle}">${exactWord}</a>`
    }
  }
  return exactWord
}

/**
 * processText - Process a text and replace all tags and handles with appropriate links
 * @returns
 */
const processMentions = ({ content, tags, handles, tagStyle, handleStyle }) =>
  content
    .replaceAll(/<.*?>/g, '') // Replace HTML tags
    .split(' ') // Split into words
    .map(processWord(tags, handles, tagStyle, handleStyle))
    .join(' ')

export default processMentions
