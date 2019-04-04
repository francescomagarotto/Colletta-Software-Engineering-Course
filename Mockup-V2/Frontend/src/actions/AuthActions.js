import axios from 'axios';
import { store } from '../index';

export const loaderOn = () => {
  return dispatch => {
    dispatch({ type: 'LOADER_ON' });
  };
};

export const displayError = error => {
  return dispatch => {
    dispatch({ type: 'DISPLAY_ERROR', error });
  };
};

export const changeSignIn = data => {
  store.dispatch({ type: 'CHANGE_SIGNIN_DATA', data });
};

export const changeSignUp = data => {
  store.dispatch({ type: 'CHANGE_SIGNUP_DATA', data });
};

export const signIn = credentials => {
  return dispatch => {
    axios
      .post('http://localhost:8081/login', {
        username: credentials.username,
        password: credentials.password
      })
      .then(res => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem(
            'token',
            JSON.stringify(res.headers.authorization)
          );
        }

        const userInfo = { user: res.data, token: res.headers.authorization };
        dispatch({ type: 'LOGIN_SUCCESS', userInfo });
      })
      .catch(() => dispatch({ type: 'LOGIN_ERROR' }));
  };
};

export const signOut = () => {
  localStorage.removeItem('user');
  return dispatch => {
    dispatch({ type: 'SIGNOUT_SUCCESS' });
  };
};

export const signUp = newUser => {
  delete newUser.password_confirm;
  return dispatch => {
    axios
      .post('http://localhost:8081/users/sign-up', newUser)
      .then(res => {
        dispatch(
          signIn({ username: newUser.username, password: newUser.password })
        );
      })
      .catch(() => dispatch({ type: 'SIGNUP_ERROR' }));
  };
};

export const updateUserInfo = user => {
  return dispatch => {
    axios
      .post(
        'http://localhost:8081/users/modify',
        {
          ...user
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: store.getState().auth.token
          }
        }
      )
      .then(res => {
        const userInfo = { user: res.data, token: store.getState().auth.token };

        if (userInfo.user.username !== user.username) store.dispatch(signOut());
        else dispatch({ type: 'LOGIN_SUCCESS', userInfo });
      })
      .catch(err => console.warn(err));
  };
};

export const initializeAuth = token => {
  /* return dispatch => {
    // Make a request for a user with a given ID
    if (token !== null) {
      axios
        .post('http://localhost:8081/users/sign-up', { token })
        .then(res => {
          dispatch({ type: 'LOAD_AUTH', user: res.data });
        })
        .catch(error => {
          dispatch({ type: 'SIGNOUT_SUCCESS' });
          console.log(error);
        });
    } else {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    }
  }; */
};
