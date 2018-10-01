import React from "react";
import { Card } from "semantic-ui-react";
import RecipeCard from "./RecipeCard";

class MyCookbook extends React.Component {
  getRecipes = () => {
    return this.props.currentUserRecipes.map(ur =>
      this.props.allRecipes.find(recipe => ur.recipe_id === recipe.id)
    );
  };

  render() {
    return (
      <React.Fragment>
        <h1>My CookBook</h1>
        <Card.Group>
          {this.getRecipes().map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Card.Group>
      </React.Fragment>
    );
  }
}

export default MyCookbook;
