import classes from './app.module.scss';
import FooterView from './components/layout/footer/FooterView';
import Router from './Router'

const App = () => (
    <div className={classes.container}>
      {/* <Router /> */}
      <FooterView></FooterView>
    </div>
  )

export default App;

