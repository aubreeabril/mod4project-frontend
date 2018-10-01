import React from "react";
import { Header, Icon, Button, Modal, Form } from "semantic-ui-react";

class Note extends React.Component {
  state = {
    noteInput: "",
    modalOpen: false,
    editModalOpen: false
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

  render() {
    let userRecipe = this.props.userRecipes.find(
      ur => ur.recipe_id === this.props.recipe.id
    );

    return (
      <React.Fragment>
        {userRecipe.note ? (
          <div>
            <h3>Note</h3>
            <p>{userRecipe.note}</p>
            <Modal
              trigger={<Button onClick={this.handleOpenEdit}>Edit Note</Button>}
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
          </div>
        ) : (
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
        )}
      </React.Fragment>
    );
  }
}

export default Note;
