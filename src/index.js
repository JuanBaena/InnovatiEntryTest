import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);


/*
var unityInstance;
function Send2Unity() {
    unityInstance = localStorage.getItem('instance');
    unityInstance.SendMessage('ybot', 'ShowMessage', 'Javascript funciona!!');
}*/