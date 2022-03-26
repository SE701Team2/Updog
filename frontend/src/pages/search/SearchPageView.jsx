import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Grid from '@mui/material/Grid'
import SearchBarView from '../../components/search/searchbar/SearchBarView'

const SearchPageView = ({ body }) => (
  <Grid
    container
    spacing={1}
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      paddingTop: '5%',
      paddingBottom: '5%',
      paddingLeft: '5%',
      paddingRight: '10%',
    }}
  >
    <Grid item xs={1}>
      <IconButton>
        <ArrowBackIcon />
      </IconButton>
    </Grid>
    <Grid item xs={10}>
      <SearchBarView />
    </Grid>
    {body}
  </Grid>
)

export default SearchPageView
