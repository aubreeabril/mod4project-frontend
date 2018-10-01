import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import RecipesList from "./components/RecipesList";
import MyCookbook from "./components/MyCookbook";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Recipe from "./components/Recipe";

class App extends Component {
  state = {
    recipes: [],
    loaded: false,
    userInfo: null,
    userRecipes: []
  };

  updateUserInfo = userInfo => {
    this.setState({ userInfo });
    this.currentUserRecipes();
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
          console.log(json);
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
  };

  addFavorite = recipe => {
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
        user_id: this.state.userInfo.id
      })
    })
      .then(r => r.json())
      .then(json => console.log(json));
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
        this.setState({
          userRecipes: json.filter(
            userRecipe => userRecipe.user_id === this.state.userInfo.id
          )
        });
      });
  };

  content() {
    return (
      <div>
        <Navbar loggedIn={!!this.state.userInfo} logout={this.logout} />
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
            <RecipesList {...props} recipes={this.state.recipes} />
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
          path="/signup"
          render={() => <SignUp updateUserInfo={this.updateUserInfo} />}
        />
        <Route
          path="/recipes/:id"
          render={data => {
            let selectedRecipe = this.state.recipes.find(
              recipe => recipe.id === parseInt(data.match.params.id)
            );
            return (
              <Recipe
                recipes
                recipe={selectedRecipe}
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

export default App;
