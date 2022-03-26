import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import App from './App'
import '@fontsource/poppins'

TimeAgo.addDefaultLocale(en)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
