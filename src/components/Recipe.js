import React from "react";
import {
  Header,
  Icon,
  Container,
  Segment,
  Modal,
  Button,
  Dropdown
} from "semantic-ui-react";
import Note from "./Note";

class Recipe extends React.Component {
  state = {
    category: null
  };

  // handleClick() {
  //   console.log("clicked");
  //   // this.props.addFavorite(this.props.recipe);
  // }

  handleChange = (e, { value }) => {
    this.setState({
      category: value
    });
  };

  render() {
    const categoryOptions = [
      { text: "Appetizer", value: 0 },
      { text: "Bread", value: 1 },
      { text: "Breakfast", value: 2 },
      { text: "Dessert", value: 3 },
      { text: "Main Dish", value: 4 },
      { text: "Side", value: 5 },
      { text: "Snack", value: 6 }
    ];
    let userRecipes = this.props.userRecipes;
    let recipe = this.props.recipe;
    let addFavorite = this.props.addFavorite;
    let removeFavorite = this.props.removeFavorite;
    let addNote = this.props.addNote;

    return (
      <Container padded="true">
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
                  <Modal
                    size="mini"
                    trigger={
                      <Icon
                        name="star outline"
                        color="grey"
                        onClick={this.handleClick}
                      />
                    }
                  >
                    <Dropdown
                      fluid
                      placeholder="Select a category"
                      selection
                      options={categoryOptions}
                      onChange={this.handleChange}
                    />
                    <Modal.Actions>
                      <Button
                        positive
                        content="Add"
                        onClick={() => addFavorite(recipe, this.state.category)}
                      />
                    </Modal.Actions>
                  </Modal>
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
