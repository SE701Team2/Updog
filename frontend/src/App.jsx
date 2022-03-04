import classes from './app.module.scss';
import { AppRouter } from './Router'
import { Header } from './components/layout/header/Header'

export const App = () => {
  return (
    <div className={classes.container}>
      <Header />
      <AppRouter />
    </div>
  );
}
