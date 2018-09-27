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
    recipes: []
  };

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = () => {
    fetch(`http://localhost:3000/recipes`)
      .then(r => r.json())
      .then(json => {
        let alpha = json.sort(function(a, b) {
          return a.title.localeCompare(b.title);
        });

        this.setState({
          recipes: alpha
        });
      });
  };

  render() {
    const recipes = this.state.recipes;
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route
          exact
          path="/recipes"
          render={props => (
            <RecipesList {...props} recipes={this.state.recipes} />
          )}
        />
        <Route exact path="/cookbook" component={MyCookbook} />
        <Route exact path="/signup" component={SignUp} />
        <Route
          path="/recipes/:id"
          render={data => {
            debugger;
            let selectedRecipe = recipes.find(
              recipe => recipe.id === parseInt(data.match.params.id)
            );
            return <Recipe recipe={selectedRecipe} />;
          }}
        />
      </div>
    );
  }
}

export default App;
