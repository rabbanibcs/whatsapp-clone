import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
// import reducer,{initialState} from './reducer'
import {StateProvider} from './StateProvider'
ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


