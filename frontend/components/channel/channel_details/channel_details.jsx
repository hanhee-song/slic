import React from 'react';

class ChannelDetails extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose() {
    this.props.history.push(`/channels/${this.props.match.params.channelId}`);
  }
  
  render () {
    const channel = this.props.channel;
    
    const name = channel.name ? channel.name : '';
    
    const about = channel.is_dm ?
      "About this conversation" : `About #${channel.name}`;
    
    const byCreator = channel.creator ?
      ` by ${channel.creator.username} ` : "";
    
    let date;
    date = new Date(channel.created_at);
    const month = "January February March April May June July August September October November December".split(' ')[date.getMonth()];
    const createdString = channel.created_at ?
      `Created ${byCreator} on ${month} ${date.getDate()}, ${date.getFullYear()}` : "";
    
    const description = channel.description ?
      channel.description : "No description available";
    
    
    const miniUsers = this.props.users.map((user) => {
      return (
        <div
          className="user-index-mini-item"
          key={user.id}>
          <div className="user-index-mini-item-icon">
            <img
              className="profile-image-mini-half-round"
              src={user.avatar_url}
              />
          </div>
          { user.username === this.props.currentUser.username ?
            <div className="user-index-mini-item-name">
              {user.username} (you)
            </div>
            :
            <div className="user-index-mini-item-name">
              {user.username}
            </div>
          }
        </div>
      );
    });
    
    return (
      <div className="channel-details">
        <div className="channel-details-header">
          <div className="channel-details-header-name">
            {
              channel.is_dm ?
              "About this conversation" :
              `About #${name}`
            }
          </div>
          <div className="channel-details-header-x">
            <i
              className="fa fa-times" aria-hidden="true"
              onClick={this.handleClose}></i>
          </div>
        </div>
        
        <div className="channel-details-list">
          { !channel.is_dm &&
            <div>
              <div className="channel-details-list-header">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                <div>
                  Channel Details
                </div>
              </div>
              <div className="channel-details-list-content">
                <div className="channel-details-list-section-header">
                  Purpose
                </div>
                <div className="channel-details-list-section-body">
                  {description}
                </div>
                <div className="channel-details-list-section-header">
                  Created
                </div>
                <div className="channel-details-list-section-body">
                  {createdString}
                </div>
              </div>
            </div>
          }
          
          { (!channel.is_dm || channel.user_count > 2) &&

            <div className="channel-details-list-members">
              <div className="channel-details-list-header">
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <div>
                  {channel.user_count} member{channel.user_count === 1 ? "" : "s"}
                </div>
              </div>
              This is a channel members list
              {miniUsers}
            </div>
          }
          
          { (channel.is_dm && channel.user_count <= 2) &&
            <div className="channel-details-list-user">
              This is a detailed user show
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ChannelDetails;
