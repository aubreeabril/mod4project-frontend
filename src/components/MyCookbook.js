import React from "react";
import { Card, Container, Button, Divider } from "semantic-ui-react";
import RecipeCard from "./RecipeCard";
import "../App.css";

const spaced = {
  margin: "0.25em"
};

const right = {
  float: "right"
};

class MyCookbook extends React.Component {
  state = {
    category: null
  };

  getRecipes = () => {
    let userRecipes;
    if (this.state.category) {
      userRecipes = this.props.currentUserRecipes.filter(
        ur => ur.category === this.state.category
      );
    } else {
      userRecipes = this.props.currentUserRecipes;
    }
    return userRecipes.map(ur => {
      let matchingRecipe = this.props.allRecipes.find(
        recipe => ur.recipe_id === recipe.id
      );
      matchingRecipe["category"] = ur.category;
      matchingRecipe["status"] = ur.status;
      matchingRecipe["rating"] = ur.rating;
      return matchingRecipe;
    });
  };

  handleClick = e => {
    this.setState({
      category: e.target.value
    });
  };

  render() {
    return (
      <Container>
        <Button
          color="gray"
          value={null}
          content="Reset"
          style={right}
          onClick={this.handleClick}
        />
        <h1>My CookBook</h1>

        <Button
          color="teal"
          value="appetizer"
          content="Appetizer"
          style={spaced}
          onClick={this.handleClick}
        />
        <Button
          color="pink"
          value="bread"
          content="Bread"
          style={spaced}
          onClick={this.handleClick}
        />
        <Button
          color="yellow"
          value="breakfast"
          content="Breakfast"
          style={spaced}
          onClick={this.handleClick}
        />
        <Button
          color="violet"
          value="dessert"
          content="Dessert"
          style={spaced}
          onClick={this.handleClick}
        />
        <Button
          color="blue"
          value="main_dish"
          content="Main Dish"
          style={spaced}
          onClick={this.handleClick}
        />
        <Button
          color="olive"
          value="side"
          content="Side"
          style={spaced}
          onClick={this.handleClick}
        />
        <Button
          color="orange"
          value="snack"
          content="Snack"
          style={spaced}
          onClick={this.handleClick}
        />
        <Divider />
        <Card.Group>
          {this.getRecipes().map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Card.Group>
      </Container>
    );
  }
}

export default MyCookbook;
