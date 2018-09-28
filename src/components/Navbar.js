import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

const Navbar = ({ loggedIn, logout }) => {
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
      {loggedIn ? (
        <React.Fragment>
          <Menu.Item as={NavLink} to="/cookbook" name="Profile" />
          <Menu.Menu position="right">
            <Menu.Item to="/logout" name="Logout" onClick={logout} />
          </Menu.Menu>
        </React.Fragment>
      ) : (
        <Menu.Item as={NavLink} to="/login" name="Login" />
      )}
    </Menu>
  );
};

export default Navbar;
