import React from "react";
import { Header, Icon } from "semantic-ui-react";
import Note from "./Note";

class Recipe extends React.Component {
  render() {
    let userRecipes = this.props.userRecipes;
    let addFavorite = this.props.addFavorite;
    let recipe = this.props.recipe;
    let removeFavorite = this.props.removeFavorite;
    let addNote = this.props.addNote;

    return (
      <React.Fragment>
        <Header as="h2" content={recipe.title} />
        <Header.Subheader as="h3">
          From:{" "}
          <a href={recipe.src_url} target="_blank">
            {recipe.source}
          </a>
        </Header.Subheader>

        {userRecipes.map(ur => ur.recipe_id).includes(recipe.id) ? (
          <Icon
            name="star"
            color="yellow"
            onClick={() => removeFavorite(recipe)}
          />
        ) : (
          <Icon
            name="star outline"
            color="grey"
            onClick={() => addFavorite(recipe)}
          />
        )}

        <Header.Subheader>Servings: {recipe.yield}</Header.Subheader>
        <img src={recipe.image} alt={recipe.title} />
        <ul>
          {recipe.ingredient_lines.map(i => (
            <li key={recipe.ingredient_lines.indexOf(i)}>{i}</li>
          ))}
        </ul>

        {userRecipes.map(ur => ur.recipe_id).includes(recipe.id) ? (
          <Note recipe={recipe} addNote={addNote} userRecipes={userRecipes} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Recipe;
