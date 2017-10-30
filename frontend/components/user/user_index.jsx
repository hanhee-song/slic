import React from 'react';
import UserIndexItemContainer from './user_index_item_container';

class UserIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchUsers();
  }
  
  handleClose() {
    this.props.clearDropdown();
  }
  
  render () {
    const users = this.props.users.reverse().map((user) => {
      return (
        <UserIndexItemContainer
          key={user.id}
          user={user} />
        );
    });
    return (
      <div className="fullscreen-container">
        <div className="fullscreen-inside">
          <div
            className="fullscreen-x"
            onClick={this.handleClose}>
            <i className="fa fa-times" aria-hidden="true"></i>
            <div className="fullscreen-esc">esc</div>
          </div>
          <div className="fullscreen-header">
            Invite others to #{this.props.channel.name}
          </div>
          <div className="fullscreen-index-list-container custom-scroll">
            <ul className="fullscreen-index-list">
              {users}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UserIndex;
