import React from 'react';

class ChannelDetails extends React.Component {
  render () {
    
    const about = this.props.channel.is_dm ?
      "About this conversation" : `About #${this.props.channel.name}`;
    
    let byCreator;
    const creator = this.props.channel.creator;
    if (creator) {
      byCreator = ` by ${creator.username} `;
    }
    
    let date;
    date = new Date(this.props.channel.created_at);
    const month = "January February March April May June July August September October November December".split(' ')[date.getMonth() - 1];
    const dateString = `${month} ${date.getDate()}, ${date.getFullYear()}`;
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
          { !this.props.channel.is_dm &&
            <div className="channel-details-list-show">
              <div className="channel-details-list-header">
                Purpose
              </div>
              <div className="channel-details-list-body">
                {this.props.channel.description}
              </div>
            </div>
          }
          
          { !this.props.channel.is_dm &&
            <div className="channel-details-list-show">
              <div className="channel-details-list-header">
                Created
              </div>
              <div className="channel-details-list-body">
                Created {byCreator} on {dateString}
              </div>
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
