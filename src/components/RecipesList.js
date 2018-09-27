import React from "react";
import { Route, Link } from "react-router-dom";
import Recipe from "./Recipe";
import { Input, Checkbox } from "semantic-ui-react";

class RecipesList extends React.Component {
  state = {
    searchTerm: "",
    filters: []
  };

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  handleCheck = (e, data) => {
    if (data.checked) {
      this.setState({
        filters: [...this.state.filters, data.name]
      });
    } else {
      let newFilters = this.state.filters.filter(
        filter => filter !== data.name
      );
      this.setState({
        filters: newFilters
      });
    }
  };

  handleFilters = () => {
    return this.props.recipes.filter(recipe => {
      return this.state.filters.every(function(value) {
        return recipe.health_labels.indexOf(value) >= 0;
      });
    });
  };

  searchResults = recipes => {
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };

  render() {
    console.log(this.props);
    const { match, recipes } = this.props;
    return (
      <div>
        {/* <Route
          path="/recipes/:id"
          render={match => {
            debugger;
            let selectedRecipe = recipes.find(
              recipe => recipe.id === parseInt(match.params.id)
            );
            return <Recipe recipe={selectedRecipe} />;
          }}
        /> */}
        <Input placeholder="search" onChange={this.handleChange} />
        <Checkbox
          toggle
          name="Sugar-Conscious"
          onChange={this.handleCheck}
          value="Sugar-Conscious"
          label={<label>Sugar conscious</label>}
        />
        <Checkbox
          toggle
          value="Tree-Nut-Free"
          label={<label>Tree nut free</label>}
          onChange={this.handleCheck}
          name="Tree-Nut-Free"
        />
        <Checkbox
          toggle
          value="Peanut-Free"
          label={<label>Peanut free</label>}
          onChange={this.handleCheck}
          name="Peanut-Free"
        />
        <Checkbox
          toggle
          name="Alcohol-Free"
          onChange={this.handleCheck}
          value="Alcohol-Free"
          label={<label>Alcohol free</label>}
        />
        {this.state.searchTerm ? (
          <ul>
            {this.searchResults(this.handleFilters()).map(r => (
              <li key={r.id}>
                <Link to={`/recipes/${r.id}`}>{r.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {this.handleFilters().map(r => (
              <li key={r.id}>
                <Link to={`/recipes/${r.id}`}>{r.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default RecipesList;
