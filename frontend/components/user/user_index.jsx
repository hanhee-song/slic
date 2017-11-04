import React from 'react';
import UserIndexItem from './user_index_item';

class UserIndex extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = ({
      selectedUserIds: [],
      inputVal: "",
      names: Object.values(this.props.users),
      closeFlag: "",
    });
    
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTopUser = this.addTopUser.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.generateList = this.generateList.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);
    this.props.fetchUsers();
  }
  
  componentWillUnmount(nextProps, nextState) {
    document.removeEventListener("keydown", this.handleEscape, false);
  }
  
  handleEscape(e) {
    if (e.keyCode === 27) {
      this.handleClose();
    }
  }
  
  handleClose() {
    this.setState({ closeFlag: "closing" });
    setTimeout(() => {
      this.props.clearDropdown();
    }, 300);
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
        this.props.subscribeUserIdsToChannel(
          this.props.channel, this.state.selectedUserIds);
        break;
      
      case "messageNew":
        // TEMP: GENERATE A RANDOM NUMBER FOR THE NAME
        const random = Math.floor(999999999 * Math.random());
        const userIds = this.state.selectedUserIds.concat(this.props.currentUser.id);
        
        this.props.createChannel({
          name: `${random}`,
          is_private: true,
          is_dm: true,
        },
        userIds
        ).then(
          response => {
            this.props.rememberCurrentChannelId(
              this.props.currentUser, response.channel.id);
            this.props.history.push(`/channels/${response.channel.id}`);
          }
        );
        break;
      default:
        break;
    }
    this.handleClose();
  }
  
  changeInput(e) {
    this.setState({ inputVal: e.target.value });
  }
  
  generateList() {
    let filteredUsers = Object.values(this.props.users).slice().reverse().filter((user) => {
      return !this.state.selectedUserIds.includes(user.id)
        && this.props.currentUser.id !== user.id;
    });
    
    if (this.props.dropdown === "inviteIndex") {
      filteredUsers = filteredUsers.filter((user) => {
        return !Object.keys(this.props.channel.users).includes(user.id.toString());
      });
    }
    
    return filteredUsers.filter((user) => {
      return user.username.includes(this.state.inputVal);
    });
  }
  
  addTopUser(e) {
    e.preventDefault();
    if (this.state.inputVal.length > 0) {
      const list = this.generateList();
      if (list.length > 0) {
        this.handleAddUser(list[list.length - 1])();
      }
    }
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
            <img
              className="profile-image-mini-half-round"
              src={user.avatar_url}
              />
          </div>
          <div className="user-index-mini-item-name">
            {user.username}
          </div>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      );
    });
    
    const filteredUsers = this.generateList();
    
    const users = filteredUsers.map((user) => {
      return (
          <UserIndexItem
            key={user.id}
            user={user}
            handleAddUser={this.handleAddUser}
            />
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
    
    const channelUsersCount = Object.keys(this.props.channel.users).length;
    const userCount = Object.keys(this.props.users).length;
    
    const anyoneToInvite = !(filteredUsers.length === 0
      && channelUsersCount > 0);
    
    
    let noOneMessage;
    if (!anyoneToInvite) {
      noOneMessage = (
        <div className="fullscreen-subheader">
          {
            this.state.selectedUserIds.length > 0 &&
            userCount !== 0 &&
            this.state.selectedUserIds.length + this.generateList().length
              === userCount - 1 &&
            "There's no one else to invite!"
          }
          {
            this.state.selectedUserIds.length === 0 &&
            Object.values(this.props.users).length > 0 &&
            "Looks like everyone is already in this channel!"
          }
        </div>
      );
    }
    
    return (
      <div className={`fullscreen-container ${this.state.closeFlag}`}>
        <div className={`fullscreen-inside ${this.state.closeFlag}`}>
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
          
          <div className="user-index-mini">
            <form onSubmit={this.addTopUser}>
              <input
                className="user-index-input"
                value={this.state.inputVal}
                onChange={this.changeInput}
                type="text"
                ></input>
            </form>
            <div
              onClick={this.handleSubmit}
              className="user-index-mini-button">
              {button}
            </div>
          </div>
          <div className="user-index-mini-list">
            {miniUsers}
          </div>
          {noOneMessage}
          <div className="fullscreen-index-list-container-users custom-scroll">
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
