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
    
    let about;
    if (channel.id) {
      about = channel.is_dm ?
      "About this conversation" : `About #${channel.name}`;
    }
    
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
          className="channel-details-user-mini-item"
          key={user.id}>
          <div className="channel-details-user-mini-icon">
            <img
              className="profile-image-mini-round"
              src={user.avatar_url}
              />
          </div>
          { user.username === this.props.currentUser.username ?
            <div className="channel-details-user-mini-name">
              {user.username} (you)
            </div>
            :
            <div className="channel-details-user-mini-name">
              {user.username}
            </div>
          }
        </div>
      );
    });
    
    let otherUser;
    if (channel.user_count === 1) {
      otherUser = Object.assign({}, this.props.currentUser);
      otherUser.username += ' (you)';
    } else if (channel.user_count === 2) {
      otherUser = this.props.users.filter((user) => {
        return user.id !== this.props.currentUser.id;
      })[0];
    }
    
    return (
      <div className="channel-details">
        <div className="channel-details-header">
          <div className="channel-details-header-name">
            {about}
          </div>
          <div className="channel-details-header-x">
            <i
              className="fa fa-times" aria-hidden="true"
              onClick={this.handleClose}></i>
          </div>
        </div>
        <div className="fullscreen-index-list-container-users custom-scroll">
          <ul className="fullscreen-index-list-nonreversed">
            { !channel.is_dm && channel.id &&
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
              channel.id &&

              <div className="channel-details-list-members">
                <div className="channel-details-list-header">
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                  <div>
                    {channel.user_count} member{channel.user_count === 1 ? "" : "s"}
                  </div>
                </div>
                {miniUsers}
              </div>
            }
            
            { (channel.is_dm && channel.user_count <= 2) &&
              <div className="channel-details-list-user">
                <div className="fullscreen-index-list-item-left user">
                  <img className="profile-image-large"
                      src={otherUser.avatar_url} />
                  <div className="fullscreen-index-list-item name">
                    {otherUser.username}
                  </div>
                </div>
                <div className="fullscreen-index-list-item preview user">
                  <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                </div>
              </div>
            }
          </ul>
        </div>
          
      </div>
    );
  }
}

export default ChannelDetails;
