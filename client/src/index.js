import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';


import './index.css';
import App from './App';
import { store } from './redux/store'

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);

