import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <Form>
      <h2>Sign up</h2>
      <Form.Field inline>
        <label>Username</label>
        <Input width={8} />
      </Form.Field>
      <Form.Field inline>
        <label>Password</label>
        <Input width={8} />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignUp;
