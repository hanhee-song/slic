import React from 'react';
// import UserIndexItemContainer from './user_index_item_container';

class UserIndex extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = ({
      selectedUserIds: []
    });
    
    this.handleClose = this.handleClose.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchUsers();
  }
  
  handleClose() {
    this.props.clearDropdown();
  }
  
  handleAddUser(user) {
    return () => {
      const selectedUserIds = this.state.selectedUserIds.concat(user.id);
      this.setState({ selectedUserIds: selectedUserIds });
    };
  }
  
  handleRemoveUser(user) {
    return () => {
      const userIds = this.state.selectedUserIds.slice();
      const i = userIds.indexOf(user.id);
      if (i > -1) {
        userIds.splice(i, 1);
        this.setState({ selectedUserIds: userIds });
      }
    };
  }
  
  handleSubmit() {
    debugger;
    this.state.selectedUserIds.forEach((userId) => {
      this.props.updateChannel({
        id: this.props.channel.id,
        user_id: userId,
      }).then(
        (success) => this.props.makeChannelVisible({
          id: this.props.channel.id,
          user_id: userId,
        })
      );
    });
    this.props.clearDropdown();
  }
  
  render () {
    const miniUsers = this.state.selectedUserIds.map((id) => {
      let user = this.props.users[id];
      return (
        <div
          onClick={this.handleRemoveUser(user)}
          className="user-index-mini-item"
          key={user.id}>
          <div className="user-index-mini-item-icon">
            
          </div>
          <div className="user-index-mini-item-name">
            {user.username}
          </div>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      );
    });
    
    const filteredUsers = Object.values(this.props.users).slice().reverse().filter((user) => {
      return !this.state.selectedUserIds.includes(user.id)
        && this.props.currentUser.id !== user.id
        && !Object.keys(this.props.channel.users).includes(user.id.toString());
    });
    
    const users = filteredUsers.map((user) => {
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
          <div className="user-index-mini">
            <div className="user-index-mini-list">
              {miniUsers}
            </div>
            <div
              onClick={this.handleSubmit}
              className="user-index-mini-button">
              Invite
            </div>
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
