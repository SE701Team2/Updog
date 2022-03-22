import { createTheme, ThemeProvider } from '@mui/material/styles'
import classes from './app.module.scss'
import palette from './styles/theme.scss'
import Router from './Router'
import AuthProvider from './contexts/AuthProvider'

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
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: palette.onPrimary,
          '&.Mui-selected': {
            color: palette.secondary,
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary,
        },
      },
    },
  },
})

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Router />
      </div>
    </ThemeProvider>
  </AuthProvider>
)

export default App
