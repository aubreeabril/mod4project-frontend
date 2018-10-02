import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

const Navbar = ({ loggedIn, logout, userInfo }) => {
  return (
    <Menu>
      <Menu.Item as={NavLink} to="/" exact>
        <h1>
          <Icon name="food" />CookBook
        </h1>
      </Menu.Item>
      <Menu.Item as={NavLink} to="/recipes" exact>
        Recipes
      </Menu.Item>
      {loggedIn ? (
        <React.Fragment>
          <Menu.Item as={NavLink} to={`/cookbook`} name="My Cookbook" />
          <Menu.Item as={NavLink} to="/newrecipe" name="Add a New Recipe" />
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
