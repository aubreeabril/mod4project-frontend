import React from "react";
import { Header } from "semantic-ui-react";

// const SourceLink = recipe => {
//   return (
//     <a href={recipe.src_url} target="_blank">
//       {recipe.source}
//     </a>
//   );
// };

const Recipe = ({ recipe }) => {
  return (
    <div>
      <Header as="h2" content={recipe.title} />
      <Header.Subheader as="h3">
        From:{" "}
        <a href={recipe.src_url} target="_blank">
          {recipe.source}
        </a>
      </Header.Subheader>
      <Header.Subheader>Servings: {recipe.yield}</Header.Subheader>
      <img src={recipe.image} alt={recipe.title} />
      <ul>{recipe.ingredient_lines.map(i => <li>{i}</li>)}</ul>
    </div>
  );
};

export default Recipe;
