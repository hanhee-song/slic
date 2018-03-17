import React from 'react';
import ChannelInfoContainer from './channel_info_container';
import ChannelUsersContainer from './channel_users_container';

class ChannelDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
  }

  handleClose() {
    this.props.closeDetails();
  }

  handleInvite() {
    this.props.receiveDropdown("inviteIndex");
  }

  render () {
    const channel = this.props.channel;

    const name = channel.name ? channel.name : '';

    let about;
    if (channel.id) {
      if (channel.is_dm) {
        about = "About this conversation";
      } else {
        if (channel.is_private) {
          about = (
            <div>
              About
              <i className="fa fa-lock" aria-hidden="true"></i>
              {channel.name}
            </div>
          );
        } else {
          about = `About #${channel.name}`;
        }
      }
    }

    return (
      <div className="channel-details">
        <div className="channel-details-header">
          <div className="channel-details-header-name">
            {about}
          </div>
          <div
            className="channel-details-header-x"
            onClick={this.handleClose} >
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        
        <div className="fullscreen-index-list-container-sidebar custom-scroll">
          <ul className="fullscreen-index-list-nonreversed">
            { !channel.is_dm && channel.id &&
              <ChannelInfoContainer />
            }
            <ChannelUsersContainer />
          </ul>
        </div>
      </div>
    );
  }
}

export default ChannelDetails;
