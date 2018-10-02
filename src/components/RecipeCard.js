import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const colorCategories = {
  appetizer: "teal",
  bread: "pink",
  breakfast: "yellow",
  dessert: "violet",
  main_dish: "blue",
  side: "olive",
  snack: "orange"
};

const right = {
  float: "right"
};

const RecipeCard = ({ recipe }) => {
  return (
    <Card
      as={Link}
      to={`/recipes/${recipe.id}`}
      color={colorCategories[`${recipe.category}`]}
    >
      <Card.Content>
        <span style={right}>
          <Icon
            size="large"
            name="bookmark"
            color={colorCategories[`${recipe.category}`]}
          />
        </span>
        <Card.Header>{recipe.title}</Card.Header>
        <Card.Meta>{recipe.source}</Card.Meta>
      </Card.Content>
      <Image src={recipe.image} />
    </Card>
  );
};

export default RecipeCard;
