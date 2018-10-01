import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Card as={Link} to={`/recipes/${recipe.id}`}>
      <Card.Content header={recipe.title} meta={recipe.source} />
      <Image src={recipe.image} />
    </Card>
  );
};

export default RecipeCard;
