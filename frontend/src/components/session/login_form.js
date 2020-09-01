import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./login_form_css.scss";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  // Once the user has been authenticated, redirect to the Profile page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/profile");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  demoLogin(e) {
    e.preventDefault();

    let user = {
      email: 'demouser@gmail.com',
      password: '123456',
    };

    this.props.login(user);

  }


  render() {
    return (
      <div className="login-background">
        <div className="login-form-container">
          <h1 className="login-header">Log In to Fridge Friends</h1>
          <img
            alt="login"
            className="login-image"
            src="https://fridge-friend-seeds.s3-us-west-1.amazonaws.com/Log+Out+or+Sign+In+2.svg"
          ></img>
          <div className="signup-link">
            <p>Don't Have An Account?</p>
            &nbsp;
            <Link to="/signup" className="signup-link-a">
              Sign Up
            </Link>
            &nbsp;
          </div>
          <form>
            <div className="login-fields">
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email Address"
              />

              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
            </div>
            <div className="login-form-buttons">
              {this.renderErrors()}
              <button
                className="login-form-button"
                onClick={this.handleSubmit}
                >
                  <Link to="/profile">Log In</Link>
              </button>
              <button
                className="demo-login-form-button"
                onClick={this.demoLogin}
                >
                  <Link to="/profile">Demo Log In</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
