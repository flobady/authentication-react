import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types';

export default function( state={}, action ) {
  switch(action.type){
    case AUTH_USER:
      return { ...state, authenticated: true }  // on retourne le state et authenticated true. dés que notre action dispatch une action de ce type, ça flipp le authenticated flag from false to true
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case FETCH_MESSAGE:
      return { ...state, message: action.payload }
  }
  return state;
}
