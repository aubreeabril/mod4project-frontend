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
    loaded: false
  };

  componentDidMount() {
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

  content() {
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
            let selectedRecipe = this.state.recipes.find(
              recipe => recipe.id === parseInt(data.match.params.id)
            );
            return <Recipe recipes recipe={selectedRecipe} />;
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
