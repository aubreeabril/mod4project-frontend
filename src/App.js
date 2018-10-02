import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import RecipesList from "./components/RecipesList";
import MyCookbook from "./components/MyCookbook";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Recipe from "./components/Recipe";
import NewRecipe from "./components/NewRecipe";
import Friends from "./components/Friends";

class App extends Component {
  state = {
    recipes: [],
    loaded: false,
    userInfo: null,
    userRecipes: [],
    allUsers: []
  };

  updateUserInfo = userInfo => {
    this.setState({ userInfo });
    this.currentUserRecipes();
    this.getAllUsers();
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(r => r.json())
        .then(json => {
          this.updateUserInfo(json.user);
        });
    }
    fetch(`http://localhost:3000/recipes`)
      .then(r => r.json())
      .then(json => {
        this.setState({
          recipes: json.sort(function(a, b) {
            return a.title.localeCompare(b.title);
          }),
          loaded: true
        });
      });
  }

  logout = () => {
    localStorage.clear();
    this.setState({ userInfo: null });
    this.props.history.push("/recipes");
  };

  addFavorite = (recipe, category) => {
    console.log(category);
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/user_recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        recipe_id: recipe.id,
        user_id: this.state.userInfo.id,
        category: category
      })
    })
      .then(r => r.json())
      .then(json => {
        this.currentUserRecipes();
      });
  };

  removeFavorite = recipe => {
    let userRecipe = this.state.userRecipes.find(
      ur => ur.recipe_id === recipe.id
    );

    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/user_recipes/${userRecipe.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        this.currentUserRecipes();
        this.props.history.push("/cookbook");
      });
  };

  currentUserRecipes = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/user_recipes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        if (this.state.userInfo) {
          this.setState({
            userRecipes: json.filter(
              userRecipe => userRecipe.user_id === this.state.userInfo.id
            )
          });
        }
      });
  };

  getAllUsers = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        this.setState({ allUsers: json });
      });
  };

  addNote = (noteInput, recipe) => {
    let userRecipe = this.state.userRecipes.find(
      ur => ur.recipe_id === recipe.id
    );
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/user_recipes/${userRecipe.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        note: noteInput
      })
    })
      .then(r => r.json())
      .then(json => this.currentUserRecipes());
  };

  addNewRecipe = newRecipe => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newRecipe)
    })
      .then(r => r.json())
      .then(json => {
        this.setState({
          recipes: [...this.state.recipes, json]
        });
        this.props.history.push(`/recipes/${json.id}`);
      });
  };

  content() {
    return (
      <div>
        <Navbar
          loggedIn={!!this.state.userInfo}
          logout={this.logout}
          userInfo={this.state.userInfo}
        />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          render={() => <LogIn updateUserInfo={this.updateUserInfo} />}
        />
        <Route
          exact
          path="/recipes"
          render={props => (
            <RecipesList
              {...props}
              recipes={this.state.recipes}
              loggedIn={!!this.state.userInfo}
            />
          )}
        />
        <Route
          exact
          path="/cookbook"
          render={() => (
            <MyCookbook
              currentUserRecipes={this.state.userRecipes}
              allRecipes={this.state.recipes}
            />
          )}
        />
        <Route
          exact
          path="/friends"
          render={() => (
            <Friends
              userInfo={this.state.userInfo}
              allUsers={this.state.allUsers}
            />
          )}
        />
        <Route
          exact
          path="/newrecipe"
          render={() => (
            <NewRecipe
              userInfo={this.state.userInfo}
              addNewRecipe={this.addNewRecipe}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => <SignUp updateUserInfo={this.updateUserInfo} />}
        />
        <Route
          path="/recipes/:id"
          render={data => {
            let selectedRecipe = this.state.recipes.find(
              recipe => recipe.id === parseInt(data.match.params.id, 10)
            );
            return (
              <Recipe
                recipes
                recipe={selectedRecipe}
                removeFavorite={this.removeFavorite}
                addNote={this.addNote}
                addFavorite={this.addFavorite}
                userRecipes={this.state.userRecipes}
              />
            );
          }}
        />
      </div>
    );
  }

  render() {
    return <div>{this.state.loaded ? this.content() : null}</div>;
  }
}

export default withRouter(App);
