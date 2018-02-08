import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: form,         // la propriété form du state contiendra le reducer
  auth: authReducer
});

export default rootReducer;
