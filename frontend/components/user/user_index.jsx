import React from 'react';
// import UserIndexItemContainer from './user_index_item_container';

class UserIndex extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = ({
      selectedUsers: []
    });
    
    this.handleClose = this.handleClose.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchUsers();
  }
  
  handleClose() {
    this.props.clearDropdown();
  }
  
  handleAddUser(user) {
    return () => {
      const selectedUsers = this.state.selectedUsers.concat(user);
      this.setState({ selectedUsers: selectedUsers });
    };
  }
  
  handleRemoveUser(user) {
    
  }
  
  render () {
    const miniUsers = this.state.selectedUsers.map((user) => {
      return (
        <div
          onClick={this.handleRemoveUser(user)}
          className="user-index-mini"
          key={user.id}>
          <div className="user-index-mini-icon">
            
          </div>
          <div className="user-index-mini-name">
            {user.username}
          </div>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      );
    });
    
    const users = this.props.users.reverse().map((user) => {
      return (
        <div
          onClick={this.handleAddUser(user)}
          className="fullscreen-index-list-li"
          key={user.id}>
            <div className="fullscreen-index-list-item-left user">
              <div className="profile-image">
                
              </div>
              <div className="fullscreen-index-list-item name">
                {user.username}
              </div>
            </div>
            <div className="fullscreen-index-list-item preview user">
              <i className="fa fa-plus-square-o" aria-hidden="true"></i>
            </div>
        </div>
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
          <div className="user-index-mini-list">
            {miniUsers}
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
