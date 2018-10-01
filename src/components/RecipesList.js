import React from "react";
import { Link } from "react-router-dom";
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
    let searches = this.state.searchTerm.toLowerCase().split(" ");
    return recipes.filter(recipe => {
      let valid = true;
      for (let i = 0; i < searches.length; i++) {
        if (recipe.title.toLowerCase().indexOf(searches[i]) === -1) {
          valid = false;
        }
      }
      return valid;
    });
  };

  render() {
    return (
      <div>
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
                {this.props.loggedIn ? (
                  <Link to={`/recipes/${r.id}`}>{r.title}</Link>
                ) : (
                  <p>{r.title}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {this.handleFilters().map(r => (
              <li key={r.id}>
                {this.props.loggedIn ? (
                  <Link to={`/recipes/${r.id}`}>{r.title}</Link>
                ) : (
                  <p>{r.title}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default RecipesList;
