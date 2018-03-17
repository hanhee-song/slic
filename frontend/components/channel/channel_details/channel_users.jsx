import React from 'react';
import PropTypes from 'prop-types';
import { collapse, expand } from '../../../util/collapse';

class ChannelUsers extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  
  
  componentWillReceiveProps(nextProps) {
    if (this.props.collapsed !== nextProps.collapsed) {
      const div = document.querySelector(".channel-details-list-content.users");
      if (this.props.collapsed) {
        expand(div);
      } else {
        collapse(div);
      }
    }
  }
  
  toggleCollapse() {
    this.props.receiveDetails({ users: this.props.collapsed });
  }
  
  render () {
    const channel = this.props.channel;
    const miniUsers = this.props.users.map((user) => {
      return (
        <div
          className="channel-details-user-mini-item"
          key={user.id}>
          <div className="channel-details-user-mini-icon">
            <img
              className="profile-image-mini-round"
              src={user.avatar_url}
              />
          </div>
          
          <div className="channel-details-mini-user-name">
            {user.username}
            {user.username === this.props.currentUser.username && " (you)"}
          </div>
        </div>
      );
    });
    
    if ((!channel.is_dm || channel.user_count > 2) && channel.id) {
      return (
        <div className="channel-details-list-members">
          <div className="channel-details-list-header"
            onClick={this.toggleCollapse}>
            <div className="flex">
              <i className="fa fa-user-o" aria-hidden="true"></i>
              <div>
                {channel.user_count} member{channel.user_count === 1 ? "" : "s"}
              </div>
            </div>
            <i className={`fa fa-caret-down ${this.props.collapsed ? "collapsed" : ""}`} aria-hidden="true"></i>
          </div>
          <div className={`channel-details-list-content users ${this.props.collapsed ? "collapsed" : ""}`}>
            {miniUsers}
            <div
              className="channel-details-list-invite"
              onClick={this.handleInvite}>
              Invite more people ...
            </div>
          </div>
        </div>
        
      );
    } else if (channel.is_dm && channel.user_count <= 2) {
      return (
        <div className="channel-details-list-user">
          <div className="fullscreen-index-list-item-left user">
            <img className="profile-image-large"
              src={channel.avatar_url} />
            <div className="fullscreen-index-list-item name">
              {channel.name}
            </div>
          </div>
          <div className="fullscreen-index-list-item preview user">
            <i className="fa fa-plus-square-o" aria-hidden="true"></i>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ChannelUsers;
