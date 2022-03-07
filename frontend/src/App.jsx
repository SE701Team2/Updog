import classes from './app.module.scss';
import { Router } from './Router'

export const App = () => {
  return (
    <div className={classes.container}>
      <Router />
    </div>
  );
}
