import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './store/store';
import './styles/style.scss'

//Notifications
import ReactNotification from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactNotification />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


