import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'

/**
 * This is the search bar component
 * When 'Enter' key is pressed, the text entered by user is recieved.
 * TO DO: Send the recieved text to backend and retrieve results.
 *
 * Note: console.log() is temporary until implementation is added. ESLint won't allow empty method.
 */
const SearchBarView = ({ initialText, handleSubmit }) => {
  const [text, setText] = useState(initialText)
  const [placeholder, setPlaceholder] = useState('Search Updog')
  return (
    <TextField
      variant="filled"
      placeholder={placeholder}
      autoComplete="off"
      value={text}
      onChange={(e) => {
        setText(e.target.value)
      }}
      onKeyPress={(key) => {
        if (key.key === 'Enter') {
          handleSubmit(text)
          setPlaceholder(text)
          setText('')
          if (text === '') {
            setPlaceholder('Search Updog')
          }
        }
      }}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        height: '2em',
        width: '100%',
        '& .MuiFilledInput-root': {
          borderRadius: '3em',
          height: '100%',
          width: '100%',
          paddingBottom: '1em',
        },
      }}
    />
  )
}

export default SearchBarView
