import React from "react";
import { Header, Button, Icon } from "semantic-ui-react";

const Recipe = ({ userRecipes, addFavorite, recipe }) => {
  return (
    <div>
      <Header as="h2" content={recipe.title} />
      <Header.Subheader as="h3">
        From:{" "}
        <a href={recipe.src_url} target="_blank">
          {recipe.source}
        </a>
      </Header.Subheader>

      {userRecipes.map(ur => ur.recipe_id).includes(recipe.id) ? (
        <Icon name="star" color="yellow" />
      ) : (
        <Icon
          name="star outline"
          color="grey"
          onClick={() => addFavorite(recipe)}
        />
      )}

      <Header.Subheader>Servings: {recipe.yield}</Header.Subheader>
      <img src={recipe.image} alt={recipe.title} />
      <ul>{recipe.ingredient_lines.map(i => <li>{i}</li>)}</ul>
    </div>
  );
};

export default Recipe;
