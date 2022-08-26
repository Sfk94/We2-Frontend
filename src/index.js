import React from 'react';
import ReactDOM from 'react-dom';

import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'

import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import rootReducer from './reducer/RootReducer';

const initialState = {

}

const middleware = [thunk];

const store = createStore(rootReducer,initialState,applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
