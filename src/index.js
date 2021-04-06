import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { firebase, FieldValue } from './utils/firebase/firebase';
import FirebaseContext from './context/FirebaseContext';

ReactDOM.render(
  <FirebaseContext.Provider value={{firebase, FieldValue}}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);


