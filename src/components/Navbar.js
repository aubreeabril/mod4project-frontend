import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

const Navbar = props => {
  return (
    <Menu>
      <Menu.Item>
        <Icon name="food" size="big" />
        <NavLink to="/" exact>
          <h1>CookBook</h1>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/recipes" exact>
          Recipes
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/cookbook" exact>
          My Cookbook
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/login" exact>
          Login
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
