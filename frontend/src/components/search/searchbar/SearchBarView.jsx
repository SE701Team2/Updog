// import { Link } from 'react-router-dom'
// import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
// // eslint-disable-next-line import/no-cycle
// import Post from './SearchBarController'
// import classes from './searchbar.module.scss'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

const SearchBarView = ({ data }) => {
  console.log(data)
  return (
    <TextField
      fullWidth
      variant="filled"
      placeholder="Search Updog"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchBarView
