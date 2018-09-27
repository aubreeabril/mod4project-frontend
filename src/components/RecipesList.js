import React from "react";
import { Route, Link } from "react-router-dom";
import Recipe from "./Recipe";

const RecipesList = ({ recipes }) => {
  return (
    <div>
      <ul>
        {recipes.map(r => <Link to={`/recipes/${r.id}`}>{r.title}</Link>)}
      </ul>
    </div>
  );
};

export default RecipesList;
