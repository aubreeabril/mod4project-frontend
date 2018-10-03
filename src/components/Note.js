import React from "react";
import {
  Header,
  Icon,
  Button,
  Modal,
  Form,
  Rating,
  Grid,
  Segment
} from "semantic-ui-react";

const right = {
  float: "right"
};

class Note extends React.Component {
  state = {
    noteInput: "",
    modalOpen: false,
    editModalOpen: false,
    rating: this.props.userRecipe.rating
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

  handleEditClick = (e, recipe) => {
    this.handleCloseEdit();

    this.props.addNote(this.state.noteInput, this.props.recipe);
  };

  handleOpenEdit = () => {
    let userRecipe = this.props.userRecipes.find(
      ur => ur.recipe_id === this.props.recipe.id
    );

    this.setState({
      editModalOpen: true,
      noteInput: userRecipe.note
    });
  };

  handleCloseEdit = () =>
    this.setState({
      editModalOpen: false
    });

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () =>
    this.setState({
      modalOpen: false
    });

  handleRating = (e, { rating }) => {
    this.setState({
      rating: rating
    });
    this.props.changeRating(this.props.userRecipe, rating);
  };

  render() {
    let userRecipe = this.props.userRecipes.find(
      ur => ur.recipe_id === this.props.recipe.id
    );

    return (
      <Grid divided>
        <Grid.Row>
          {userRecipe.note ? (
            <Grid.Column width={8}>
              <h3>Note</h3>
              <p>{userRecipe.note}</p>
              <Modal
                trigger={
                  <Button onClick={this.handleOpenEdit}>Edit Note</Button>
                }
                open={this.state.editModalOpen}
                onClose={this.handleCloseEdit}
              >
                <Header content={`Edit note for ${this.props.recipe.title}`} />
                <Form>
                  <Form.Field>
                    <textarea
                      value={this.state.noteInput}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form>
                <Modal.Actions>
                  <Button basic color="green" onClick={this.handleEditClick}>
                    <Icon name="save" />
                    Save
                  </Button>
                </Modal.Actions>
              </Modal>
            </Grid.Column>
          ) : (
            <Grid.Column width={8}>
              <Modal
                trigger={<Button onClick={this.handleOpen}>Add note</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
              >
                <Header content={`Add note to ${this.props.recipe.title}`} />
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
            </Grid.Column>
          )}
          {this.props.userRecipe.status === "want_to_make" ? (
            <Grid.Column width={8}>
              <Button.Group>
                <Button positive content="Want To Make" />
                <Button.Or />
                <Button
                  content="Made"
                  onClick={() => this.props.changeStatus(this.props.userRecipe)}
                />
              </Button.Group>
            </Grid.Column>
          ) : (
            <Grid.Column width={8}>
              <Button.Group>
                <Button disabled content="Want To Make" />
                <Button.Or />
                <Button positive content="Made" />
              </Button.Group>
              <span style={right}>
                <Segment compact>
                  Rating:{" "}
                  <Rating
                    icon="star"
                    defaultRating={this.state.rating}
                    maxRating={5}
                    onRate={this.handleRating}
                  />
                </Segment>
              </span>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    );
  }
}

export default Note;
