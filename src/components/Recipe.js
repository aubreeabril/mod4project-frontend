import React from "react";
import { Header, Icon, Container, Segment, Divider } from "semantic-ui-react";
import Note from "./Note";

class Recipe extends React.Component {
  render() {
    let userRecipes = this.props.userRecipes;
    let addFavorite = this.props.addFavorite;
    let recipe = this.props.recipe;
    let removeFavorite = this.props.removeFavorite;
    let addNote = this.props.addNote;

    return (
      <Container padded>
        <Segment attached="top">
          <Segment clearing secondary>
            <Segment floated="right">
              {userRecipes.map(ur => ur.recipe_id).includes(recipe.id) ? (
                <p>
                  Favorited{" "}
                  <Icon
                    name="star"
                    color="yellow"
                    onClick={() => removeFavorite(recipe)}
                  />
                </p>
              ) : (
                <p>
                  Add to cookbook{" "}
                  <Icon
                    name="star outline"
                    color="grey"
                    onClick={() => addFavorite(recipe)}
                  />
                </p>
              )}
            </Segment>

            <Header as="h2" floated="left">
              <Header.Content>
                {recipe.title}
                <Header.Subheader>
                  From:{" "}
                  <a href={recipe.src_url} target="_blank">
                    {recipe.source}
                  </a>
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Segment>

          <img src={recipe.image} alt={recipe.title} />

          <p>Servings: {recipe.yield}</p>
          <ul>
            {recipe.ingredient_lines.map(i => (
              <li key={recipe.ingredient_lines.indexOf(i)}>{i}</li>
            ))}
          </ul>
        </Segment>
        <Segment attached="bottom">
          {userRecipes.map(ur => ur.recipe_id).includes(recipe.id) ? (
            <Note recipe={recipe} addNote={addNote} userRecipes={userRecipes} />
          ) : null}
        </Segment>
      </Container>
    );
  }
}

export default Recipe;
