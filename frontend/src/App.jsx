import classes from './app.module.scss';
import FooterController from './components/layout/footer/FooterController';
import FooterView from './components/layout/footer/FooterView';
import Router from './Router'

const App = () => (
    <div className={classes.container}>
      {/* <Router /> */}
      <FooterController />
    </div>
  )

export default App;

