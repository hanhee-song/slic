import React from 'react';

class ChannelDetails extends React.Component {
  render () {
    const about = this.props.channel.is_dm ?
      "About this conversation" : `About #${this.props.channel.name}`;
    
    return (
      <div className="channel-details">
        <div className="channel-details-header">
          <div className="channel-details-header-name">
            {
              this.props.channel.is_dm ?
              "About this conversation" :
              `About #${this.props.channel.name}`
            }
          </div>
          <div className="channel-details-header-x">
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        
        <div className="channel-details-list">
          { this.props.channel.is_dm &&
            <div className="channel-details-list-show">
              
            </div>
          }
          
          <div className="channel-details-list-members">
            
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelDetails;
