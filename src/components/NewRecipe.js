import React from "react";
import { Button, Form, Checkbox, Container } from "semantic-ui-react";

class NewRecipe extends React.Component {
  state = {
    numberOfIngredients: 2,
    newRecipe: {
      health_labels: [],
      ingredient_lines: [],
      yield: 1,
      source: this.props.userInfo.username
    }
  };

  handleChange = e => {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [e.target.name]: e.target.value
      }
    });
  };

  handleNumberChange = e => {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    });
  };

  handleCheckboxes = (e, data) => {
    if (data.checked) {
      this.setState({
        newRecipe: {
          ...this.state.newRecipe,
          health_labels: [...this.state.newRecipe.health_labels, data.value]
        }
      });
    } else {
      let newHealthLabels = this.state.newRecipe.health_labels.filter(
        hl => hl !== data.value
      );
      this.setState({
        newRecipe: {
          ...this.state.newRecipe,
          health_labels: newHealthLabels
        }
      });
    }
  };

  handleIngredientChange = e => {
    let newIngredients = this.state.newRecipe.ingredient_lines;
    newIngredients[e.target.id] = e.target.value;
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        ingredient_lines: newIngredients
      }
    });
  };

  increaseIngredients = () => {
    this.setState({
      numberOfIngredients: this.state.numberOfIngredients + 1
    });
  };

  renderIngredientForms = () => {
    let ingredientForms = [];
    for (let i = 0; i < this.state.numberOfIngredients; i++) {
      ingredientForms.push(
        <Form.Field key={i} width={8}>
          <input
            id={i}
            type="text"
            placeholder="Ingredient"
            onChange={this.handleIngredientChange}
          />
        </Form.Field>
      );
    }
    return ingredientForms;
  };

  render() {
    return (
      <Container>
        <Form>
          <h3>Add a new recipe:</h3>
          <Form.Field width={8}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field width={3}>
            <input
              type="number"
              min={1}
              name="yield"
              placeholder="Servings"
              onChange={this.handleNumberChange}
            />
          </Form.Field>
          <Form.Field width={8}>
            <input
              type="text"
              name="image"
              placeholder="Image url"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field
            control={Checkbox}
            label="low sugar"
            value="Sugar-Conscious"
            onChange={this.handleCheckboxes}
          />
          <Form.Field
            control={Checkbox}
            label="peanut free"
            value="Peanut-Free"
            onChange={this.handleCheckboxes}
          />
          <Form.Field
            control={Checkbox}
            label="tree nut free"
            value="Tree-Nut-Free"
            onChange={this.handleCheckboxes}
          />
          <Form.Field
            control={Checkbox}
            label="alcohol free"
            value="Alcohol-Free"
            onChange={this.handleCheckboxes}
          />
          {this.renderIngredientForms()}
          <Button
            icon="plus"
            onClick={this.increaseIngredients}
            content="More ingredients"
          />
          <Button
            type="submit"
            content="Submit new recipe"
            onClick={() => this.props.addNewRecipe(this.state.newRecipe)}
          />
        </Form>
      </Container>
    );
  }
}

export default NewRecipe;
