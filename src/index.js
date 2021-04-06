import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContext from './context/FirebaseContext'

ReactDOM.render(
  <FirebaseContext.Provider>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);


