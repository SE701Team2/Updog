import { useState } from 'react'
import TextField from '@mui/material/InputBase'
import SampleFeed from './mockData'
import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'

const SearchPage = () => {
  const [searchTerm, setSeachTerm] = useState([])

  return (
    <div className="App">
      <Header />
      <br />
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        size="normal"
        placeholder="Seach..."
        onChange={(event) => {
          setSeachTerm(event.target.value)
        }}
      />
      <br />
      {SampleFeed.filter((val) => {
        if (val.content.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
        return 1
        /* eslint-disable */
      }).map((val, id) => (
        <div className="title" key={id}>
          {' '}
          <p>{val.content}</p>
          <br />
        </div>
      ))}
      ;
      <Footer />
    </div>
  )
}

export default SearchPage
