import { createTheme, ThemeProvider } from '@mui/material/styles'
import classes from './app.module.scss';
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
});

const App = () => (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  )

export default App;

