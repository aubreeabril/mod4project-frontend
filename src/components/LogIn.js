import React from "react";
import { Button, Input, Form, Message } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LogIn extends React.Component {
  state = {
    username: "",
    password: "",
    errorMessage: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const url = "http://localhost:3000/login";
    const params = {
      username: this.state.username,
      password: this.state.password
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ user: params }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(response => {
        localStorage.setItem("token", response.jwt);
        this.props.updateUserInfo(response.user);
        if (response.jwt) {
          this.props.history.push("/cookbook");
        } else {
          this.setState({
            errorMessage: response.message
          });
        }
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Log In</h2>
        {this.state.errorMessage ? (
          <Message negative>
            <Message.Header>{this.state.errorMessage}</Message.Header>
          </Message>
        ) : null}
        <Form.Field inline>
          <label>Username</label>
          <Input
            width={8}
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field inline>
          <label>Password</label>
          <Input
            width={8}
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type="submit">Log In</Button>
        <NavLink to="/signup" exact>
          Sign Up
        </NavLink>
      </Form>
    );
  }
}

export default withRouter(LogIn);
