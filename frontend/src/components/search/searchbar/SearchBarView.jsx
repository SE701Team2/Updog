// import { Link } from 'react-router-dom'
// import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
// // eslint-disable-next-line import/no-cycle
// import Post from './SearchBarController'
// import classes from './searchbar.module.scss'
import TextField from '@mui/material/TextField'

const SearchBarView = ({ data }) => {
  console.log(data)
  return <TextField variant="filled" placeholder="Search Updog" />
}

export default SearchBarView
