import React, { useState } from 'react'
import classes from './postinput.module.scss'

/**
 * PostInputView is the view for the post input
 * this view also handles the textarea rendering and the textarea state
 * instead of a textarea, this view uses a div
 * @param {*} param0
 * @returns
 */
const PostInputView = ({
  setPostText,
  remainingChar,
  maxCharLength,
  InputRef,
}) => {
  const [lastHtml, setLastHtml] = useState('')

  /**
   * Set the location of the cursor in the textarea
   * @param {number} location
   */
  const setCursor = (location) => {
    const el = document.getElementById('post-input-editable')
    const range = document.createRange()
    const sel = window.getSelection()

    // Get the correct node to select for the textContent location
    let nodeIndex = 0
    let currNode = el.childNodes[nodeIndex]
    let offset = location

    if (currNode === undefined) {
      return
    }

    while (currNode.textContent.length < offset) {
      offset -= currNode.textContent.length
      nodeIndex += 1
      currNode = el.childNodes[nodeIndex]
    }

    // If the current Node doesn't have a child set offset on the current node
    if (currNode.textContent.length === currNode.length) {
      range.setStart(currNode, offset)
    } else {
      // If the current node is a span, we need to find the correct offset
      range.setStart(currNode.childNodes[0], offset)
    }
    range.collapse(true)

    // Set the selection location
    sel.removeAllRanges()
    sel.addRange(range)
  }

  /**
   * Gets Cursor Position in the textarea
   * Resource: https://stackoverflow.com/a/30400227/13876862
   */
  const getCursor = () => {
    const el = document.getElementById('post-input-editable')
    let caretOffset = 0
    if (window.getSelection) {
      const range = window.getSelection().getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(el)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      caretOffset = preCaretRange.toString().length
    } else if (document.selection && document.selection.type !== 'Control') {
      const textRange = document.selection.createRange()
      const preCaretTextRange = document.body.createTextRange()
      preCaretTextRange.moveToElementText(el)
      preCaretTextRange.setEndPoint('EndToEnd', textRange)
      caretOffset = preCaretTextRange.text.length
    }
    return caretOffset
  }

  /**
   * emitChange is called when the textarea is changed
   */
  const emitChange = () => {
    const location = getCursor()
    const html = InputRef.current.innerHTML
    if (html !== lastHtml) {
      // There is change in the html
      setPostText(html)
    }
    setLastHtml(html)

    // Set the cursor location
    if (InputRef.current.textContent < location) {
      setCursor(InputRef.current.textContent.length)
      return
    }
    setCursor(location)
  }

  return (
    <div className={classes.input}>
      <div
        id="post-input-editable"
        ref={InputRef}
        contentEditable
        className={classes.textarea}
        maxLength={maxCharLength}
        placeholder="What's Updog?"
        onInput={emitChange}
        onBlur={() => {
          // onFocusLeave trim the text so placeholder shows
          // eslint-disable-next-line no-param-reassign
          InputRef.current.innerHTML = InputRef.current.innerHTML.trim()
        }}
        onKeyPress={(e) => {
          // limit the text to maxCharLength
          const currentTextLength = e.target.outerText.length
          if (currentTextLength >= maxCharLength && e.key !== 'Backspace') {
            e.preventDefault()
          }
        }}
        onPaste={(e) => {
          // limit pasting when maxCharLength is reached
          const currentTextLength = e.target.outerText.length
          if (currentTextLength >= maxCharLength) {
            e.preventDefault()
          }
        }}
      />
      <p
        className={
          remainingChar === 0 ? classes.charLengthRed : classes.charLength
        }
      >
        {remainingChar} characters remaining
      </p>
    </div>
  )
}

export default PostInputView
