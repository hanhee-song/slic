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
    this.inviteToChannel = this.inviteToChannel.bind(this);
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
    switch (this.props.dropdown) {
      case "inviteIndex":
        this.inviteToChannel(this.state.selectedUserIds, this.props.channel);
        break;
      
      case "messageNew":
        // TEMP: GENERATE A RANDOM NUMBER FOR THE NAME
        const random = Math.floor(999999 * Math.random());
        
        this.props.createChannel({
          name: `${random}`,
          is_private: true,
          is_dm: true,
        }).then(
          response => {
            const userIds = this.state.selectedUserIds.concat(this.props.currentUser.id);
            this.inviteToChannel(userIds, response.channel);
            
            this.props.rememberCurrentChannelId(
              this.props.currentUser, response.channel.id);
            this.props.history.push(`/channels/${response.channel.id}`);
          }
        );
        // create a new channel with private + dm = true
        
        // then invite all the users to the channel
          // don't forget to invite current user
        // then make channel visible
        break;
      default:
        break;
        
    }
    this.props.clearDropdown();
  }
  
  inviteToChannel(userIds, channel) {
    this.props.subscribeUserIdsToChannel(userIds, channel);
    // userIds.forEach((userId) => {
    //   this.props.updateChannel({
    //     id: channelId,
    //     user_id: userId,
    //   }).then(
    //     (success) => this.props.makeChannelVisible({
    //       id: channelId,
    //       user_id: userId,
    //     })
    //   );
    // });
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
    
    let filteredUsers = Object.values(this.props.users).slice().reverse().filter((user) => {
      return !this.state.selectedUserIds.includes(user.id)
        && this.props.currentUser.id !== user.id;
    });
    
    if (this.props.dropdown === "inviteIndex") {
      filteredUsers = filteredUsers.filter((user) => {
        return !Object.keys(this.props.channel.users).includes(user.id.toString());
      });
    }
    
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
    
    let header;
    let subheader;
    let button;
    switch (this.props.dropdown) {
      case "inviteIndex":
        header = `Invite others to ${this.props.channel.name}`;
        button = "Invite";
        break;
      case "messageNew":
        header = "Direct Message";
        subheader = "Start a conversation";
        button = "Go";
        break;
      default:
        break;
    }
    
    const anyoneToInvite = !(filteredUsers.length === 0
      && Object.keys(this.props.channel.users).length > 0);
    
    let noOneMessage;
    if (!anyoneToInvite) {
      noOneMessage = (
        <div className="fullscreen-subheader">
          Looks like everyone is already in this channel!
        </div>
      );
    }
    
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
            {header}
          </div>
          
          { this.props.dropdown !== "inviteIndex" &&
            <div className="fullscreen-subheader">
              {subheader}
            </div>
          }
          {noOneMessage}
          
          <div className="user-index-mini">
            <div className="user-index-mini-list">
              {miniUsers}
            </div>
            
            { this.props.dropdown !== "messageIndex"
              && anyoneToInvite
              &&
              <div
                onClick={this.handleSubmit}
                className="user-index-mini-button">
                {button}
              </div>
            }
            
            
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
