import { createTheme, ThemeProvider } from '@mui/material/styles'
import classes from './app.module.scss'
import palette from './styles/theme.scss'
import Router from './Router'

const theme = createTheme({
    palette: {
        primary: {
            main: palette.primary,
            light: palette.primaryVariant,
        },
        secondary: {
            main: palette.secondary,
            light: palette.secondaryVariant,
        },
        error: {
            main: palette.error,
        },
    },
})

const App = () => (
  <ThemeProvider theme={theme}>
    <div className={classes.container}>
      <Router />
    </div>
  </ThemeProvider>
)

export default App
