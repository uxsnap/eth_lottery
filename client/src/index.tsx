import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';

import { web3Store } from './mobxStore';

import './static/Roboto/index.css';
import './assets/icons/fontello.css';
import './index.scss';

ReactDOM.render((
  <App />
),
  document.getElementById('root'));