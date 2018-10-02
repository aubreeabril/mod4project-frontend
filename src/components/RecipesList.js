import React from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Checkbox,
  Card,
  Image,
  Container,
  Segment,
  Divider
} from "semantic-ui-react";

const right = {
  float: "right"
};

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
      <Container>
        <Input
          style={right}
          placeholder="search"
          onChange={this.handleChange}
          size="large"
          icon="search"
          iconPosition="left"
        />
        <h1>All Recipes</h1>

        <Segment.Group horizontal>
          <Segment>
            <Checkbox
              toggle
              name="Sugar-Conscious"
              onChange={this.handleCheck}
              value="Sugar-Conscious"
              label={<label>Sugar conscious</label>}
            />
          </Segment>
          <Segment>
            <Checkbox
              toggle
              value="Tree-Nut-Free"
              label={<label>Tree nut free</label>}
              onChange={this.handleCheck}
              name="Tree-Nut-Free"
            />
          </Segment>
          <Segment>
            <Checkbox
              toggle
              value="Peanut-Free"
              label={<label>Peanut free</label>}
              onChange={this.handleCheck}
              name="Peanut-Free"
            />
          </Segment>
          <Segment>
            <Checkbox
              toggle
              name="Alcohol-Free"
              onChange={this.handleCheck}
              value="Alcohol-Free"
              label={<label>Alcohol free</label>}
            />
          </Segment>
        </Segment.Group>
        <Divider />
        {this.state.searchTerm ? (
          <Card.Group>
            {this.searchResults(this.handleFilters()).map(r => (
              <Card key={r.id}>
                {this.props.loggedIn ? (
                  <Card.Content>
                    <Image floated="right" size="tiny" src={r.image} />
                    <Link to={`/recipes/${r.id}`}>
                      <h3>{r.title}</h3>
                    </Link>
                    <Card.Meta>{r.source}</Card.Meta>
                  </Card.Content>
                ) : (
                  <Card.Content>
                    <Image floated="right" size="tiny" src={r.image} />
                    <h3>{r.title}</h3>
                    <Card.Meta>{r.source}</Card.Meta>
                  </Card.Content>
                )}
              </Card>
            ))}
          </Card.Group>
        ) : (
          <Card.Group>
            {this.handleFilters().map(r => (
              <Card key={r.id}>
                {this.props.loggedIn ? (
                  <Card.Content>
                    <Image floated="right" size="tiny" src={r.image} />
                    <Link to={`/recipes/${r.id}`}>
                      <h3>{r.title}</h3>
                    </Link>
                    <Card.Meta>{r.source}</Card.Meta>
                  </Card.Content>
                ) : (
                  <Card.Content>
                    <Image floated="right" size="tiny" src={r.image} />
                    <h3>{r.title}</h3>
                    <Card.Meta>{r.source}</Card.Meta>
                  </Card.Content>
                )}
              </Card>
            ))}
          </Card.Group>
        )}
      </Container>
    );
  }
}

export default RecipesList;
