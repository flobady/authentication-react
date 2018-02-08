import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps){
    // call action creator to signup the user
    this.props.signupUser(formProps);
  }

  renderAlert(){
    console.log("props :",this.props.errorMessage);
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>OOps</strong> {this.props.errorMessage}
        </div>
        );
    }
  }

  render(){
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fielset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          { email.touched && email.error && <div className="error">{email.error}</div>}
        </fielset>
        <fielset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} type="password"/>
          { password.touched && password.error && <div className="error">{password.error}</div>}
        </fielset>
        <fielset className="form-group">
          <label>Confirm password:</label>
          <input className="form-control" {...passwordConfirm} type="password"/>
          { passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fielset>
        { this.renderAlert() }
        <button className="btn btn-primary">Sign up!</button>
      </form>
      );
  }
}

function validate(formProps){
  const errors ={};

  if(formProps.password !== formProps.passwordConfirm){
    errors.password = "Password must match";
  }

  if(!formProps.email){
    errors.email = "Please enter an email";
  }

    if(!formProps.password){
    errors.password = "Please enter a password";
  }

    if(!formProps.passwordConfirm){
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions )(Signup);
