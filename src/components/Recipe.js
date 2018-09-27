import React from "react";

const Recipe = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} />
      <ul>{recipe.ingredient_lines.map(i => <li>{i}</li>)}</ul>
      <a href={recipe.src_url} target="_blank">
        {recipe.source}
      </a>
    </div>
  );
};

export default Recipe;
