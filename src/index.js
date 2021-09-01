import React from 'react';
import ReactDOM from 'react-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './components/store/Reducers/index'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer, composeWithDevTools())
let persistor = persistStore(store)


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);



