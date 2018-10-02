import React from "react";
import { Search } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Friends extends React.Component {
  state = {
    searchTerm: ""
  };

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  searchResults = () => {
    let otherUsers = this.props.allUsers.filter(
      user => user.id !== this.props.userInfo.id
    );
    let results = otherUsers.filter(user =>
      user.username.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    return results;
  };

  render() {
    return (
      <React.Fragment>
        <h3>Friends</h3>
        <div className="ui search">
          <input type="text" className="prompt" onChange={this.handleChange} />
        </div>
        {this.state.searchTerm ? (
          <ul>
            {this.searchResults().map(u => (
              <li key={u.id}>
                <Link to={`/cookbook/${u.id}`}>{u.username}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {this.props.allUsers
              .filter(user => user.id !== this.props.userInfo.id)
              .map(u => (
                <li key={u.id}>
                  <Link to={`/cookbook/${u.id}`}>{u.username}</Link>
                </li>
              ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

export default Friends;
