import { useEffect, useState } from 'react'
import TextField from '@mui/material/InputBase'
import sampleFeed from './mockData'
import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'
import Post from '../../components/posts/post/PostController'

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])

  useEffect(() => {
    const filtered = sampleFeed.filter((post) => {
      if (!searchTerm) return true
      return post.content.toLowerCase().includes(searchTerm.toLowerCase())
    })

    setFilteredPosts(filtered)
  }, [searchTerm])

  return (
    <div className="App">
      <Header />
      <br />
      <TextField
        id="standard-basic"
        label="Standard"
        variant="outlined"
        size="normal"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
      />
      <br />
      {filteredPosts.map((val, id) => (
        /* eslint-disable */
        <div key={id}>
          <Post data={val} condensed />
        </div>
      ))}
      <Footer />
    </div>
  )
}

export default SearchPage
