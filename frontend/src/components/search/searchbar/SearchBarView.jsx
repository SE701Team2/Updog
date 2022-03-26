import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

const SearchBarView = ({ data }) => {
  console.log(data)
  return (
    <TextField
      variant="filled"
      placeholder="Search Updog"
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
