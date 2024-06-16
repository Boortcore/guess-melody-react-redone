import * as ReactDOM from 'react-dom/client';
import App from './0.app';
import './assets/style.css';
import { startSaga } from './0.app/app-saga';

startSaga()
ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <App/>
  )