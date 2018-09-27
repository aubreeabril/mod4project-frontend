import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const LogIn = () => {
  return (
    <Form>
      <h2>Log in</h2>
      <Form.Field inline>
        <label>Username</label>
        <Input width={8} />
      </Form.Field>
      <Form.Field inline>
        <label>Password</label>
        <Input width={8} />
      </Form.Field>
      <Button type="submit">Submit</Button>
      <NavLink to="/signup" exact>
        Sign Up
      </NavLink>
    </Form>
  );
};

export default LogIn;
