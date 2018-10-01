import React from "react";
import { Header, Icon, Button, Modal, Form } from "semantic-ui-react";

class Recipe extends React.Component {
  state = {
    noteInput: "",
    modalOpen: false
  };

  handleChange = e => {
    this.setState({
      noteInput: e.target.value
    });
  };

  handleClick = (e, recipe) => {
    this.handleClose();

    this.props.addNote(this.state.noteInput, this.props.recipe);
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () =>
    this.setState({
      modalOpen: false
    });

  render() {
    let userRecipes = this.props.userRecipes;
    let addFavorite = this.props.addFavorite;
    let recipe = this.props.recipe;
    let removeFavorite = this.props.removeFavorite;

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
          <Modal
            trigger={<Button onClick={this.handleOpen}>Add note</Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Header content={`Add note to ${recipe.title}`} />
            <Form>
              <Form.Field>
                <textarea placeholder="Note" onChange={this.handleChange} />
              </Form.Field>
            </Form>
            <Modal.Actions>
              <Button basic color="green" onClick={this.handleClick}>
                <Icon name="save" />
                Save
              </Button>
            </Modal.Actions>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Recipe;
