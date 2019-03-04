import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import rootReducer from './store/reducers/RootReducer';
import App from './App';
import fbConfig from './config/fbConfig';
import { register } from './serviceWorker';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig, {
      userProfile: 'users',
      presence: 'presence',
      useFirestoreForProfile: true,
      attachAuthIsReady: true
    }),
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

store.firebaseAuthIsReady
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
    register();
  })
  .catch(() => {
    ReactDOM.render(<h1>Sto caricando</h1>, document.getElementById('root'));
    register();
  });

// });

// PROMEMORIA ->  FILE MAIN.JS, RIGA 26935 COMMENTATO PER ERRORE IN CONSOLE
