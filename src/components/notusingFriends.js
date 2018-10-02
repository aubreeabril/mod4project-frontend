import React from "react";
import { Search } from "semantic-ui-react";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: "",
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.resultRenderer = this.resultRenderer.bind(this);
  }

  handleChange = (e, { value }) => {
    e.persist();
    this.setState({ isLoading: true, value });
    setTimeout(() => {
      let otherUsers = this.props.allUsers.filter(
        user => user.id !== this.props.userInfo.id
      );
      let results = otherUsers
        .map(user => user.username)
        .filter(username =>
          username
            .toLowerCase()
            .includes(
              e.target.value
                .toLowerCase()
                .map(result => ({ ...result, key: result.id }))
            )
        );
      this.setState({
        isLoading: false,
        results: results
      });
    }, 300);
  };

  resultRenderer({ id, username }) {
    return (
      <div id={id} key={id}>
        {username}
      </div>
    );
  }

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <React.Fragment>
        <h3>Friends</h3>
        <Search
          loading={isLoading}
          resultRenderer={this.resultRenderer}
          onSearchChange={this.handleChange}
          value={value}
          results={results}
        />
      </React.Fragment>
    );
  }
}

export default Friends;
