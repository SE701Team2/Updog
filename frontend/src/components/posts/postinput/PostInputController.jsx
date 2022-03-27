import { useContext, useRef, useState } from 'react'
import { HandleContext } from '../../../contexts/HandleProvider'
import { TagContext } from '../../../contexts/TagProvider'
import PostInputView from './PostInputView'
import classes from './postinput.module.scss'

/**
 * PostInputController is the controller for the post input with mention and tag support
 * @prop setPostText - set the text of the post as string
 * @prop setPostTags - set the tags of the post as array of tags
 */
const PostInputController = ({
  setPostText,
  setPostTags,
  setNewTags,
  setPostHandles,
}) => {
  const maxCharLength = 250
  const { tags } = useContext(TagContext)
  const { handles } = useContext(HandleContext)
  const [remainingChar, setRemainingChar] = useState(maxCharLength)
  const InputRef = useRef(null)

  /**
   * Add mentions and tags to the textarea
   * Removes HTML tags and split content into words and check if tag/mentions exist
   * @param {string} text - text input
   * @returns {string} - text with tags and mentions
   */
  const convert = (text) => {
    const usedTags = []
    const newTags = []
    const usedHandles = []
    const newText = text
      .replaceAll(/<.*?>/g, '') // Replace HTML tags
      .split(' ') // Split into words
      .map((exactWord) => {
        // Remove &nbsp; from checks
        const word = exactWord.replaceAll('&nbsp;', '')
        if (word.startsWith('#')) {
          // Check for hashtags
          const tag = tags.find((t) => t.name === word.slice(1))
          if (tag) {
            usedTags.push(tag)
            return `<span class="${classes.tag}">${exactWord}</span>`
          }

          // tag doesn't exist
          newTags.push(word.replace(/[,.;]\s*$/, '').slice(1))
          return `<span class="${classes.tag}">${exactWord}</span>`
        }

        if (word.startsWith('@')) {
          // Check for mentions
          const handle = handles.find((h) => h.name === word.slice(1))
          if (handle) {
            usedHandles.push(handle)
            return `<span class="${classes.mention}">${exactWord}</span>`
          }
        }
        return exactWord
      })
      .join(' ')

    if (setPostTags) {
      setPostTags(usedTags)
    }

    if (setPostHandles) {
      setPostHandles(usedHandles)
    }

    if (setNewTags) {
      setNewTags(newTags)
    }

    return newText
  }

  return (
    <PostInputView
      setPostText={(text) => {
        InputRef.current.innerHTML = convert(text)
        if (InputRef.current.textContent.length > maxCharLength) {
          setRemainingChar(0)
          return
        }
        setRemainingChar(maxCharLength - InputRef.current.textContent.length)
        setPostText(text)
      }}
      maxCharLength={maxCharLength}
      remainingChar={remainingChar}
      InputRef={InputRef}
    />
  )
}

export default PostInputController
