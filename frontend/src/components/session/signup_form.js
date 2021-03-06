import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './signup_form_css.scss'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
     
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.signup(user);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li className="errors" key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-background">
        <div className="signup-form-container">
          <h1 className="signup-header">Create a New Account</h1>
          <img
            alt="sign up"
            className="signup-image"
            src="https://fridge-friend-seeds.s3-us-west-1.amazonaws.com/Log+Out+or+Sign+In+5.svg"
          ></img>
          <div className="login-link">
            <p>Already Have An Account?</p>
            &nbsp;
            <Link to="/login" className="login-link-a" onClick={this.props.clearErrors}>
              Log In
            </Link>
            &nbsp;
          </div>
          <form>
            <div className="signup-fields">
              <div className="first-and-last-name">
                <input
                  className="first-name"
                  type="text"
                  value={this.state.firstname}
                  onChange={this.update("firstname")}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={this.state.lastname}
                  onChange={this.update("lastname")}
                  placeholder="Last Name"
                />
              </div>
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
              <input
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                placeholder="Confirm Password"
              />
            </div>
            {this.renderErrors()}
              <button
                className="signup-form-button"
                onClick={this.handleSubmit}
              >
                Create An Account
              </button>
              <br />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);