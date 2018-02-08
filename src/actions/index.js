import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }){
  return function(dispatch){      // on retourne cette foncton grace à redux thunk et on dispatch quand on veut
    // submit email / password to server
    axios.post(`${ROOT_URL}/signin` , { email, password })
      .then( response => {
        // if request is good...
        // - update the state
        dispatch({ type: AUTH_USER });    // on dispatch l'action pour qu'elle aille au reducer qui va capter l'action type et mettre à jour le state

        // - save the jwt token
        localStorage.setItem( 'token', response.data.token );

        // - redirect to the route /feature
        browserHistory.push('/feature');    // programmatic navigation
        })
      .catch( err => {
        // if not good, we send a message
        dispatch(authError('Bad login info'));
        });
  }
}

export function signupUser({email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup` , { email, password })
    .then( response => {
          dispatch({ type: AUTH_USER });
          localStorage.setItem('token', response.data.token);
          browserHistory.push('/feature');
          })
    .catch( error => {
          dispatch(authError(error.response.data.error));
          });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}


export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then( response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}











