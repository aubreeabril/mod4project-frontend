import React from "react";
import { Button, Input, Form, Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class SignUp extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const url = "http://localhost:3000/users";
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
        localStorage.setItem("token", response.token);
        this.props.updateUserInfo(response.user);
        this.props.history.push("/cookbook");
      });
  };

  render() {
    return (
      <Container textAlign="center">
        <Form onSubmit={this.handleSubmit}>
          <h2>Sign up</h2>
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
          <Button type="submit">Sign Up</Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
