import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class ChannelInfo extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  
  toggleCollapse() {
    this.props.receiveDetails({ info: this.props.collapsed });
  }
  
  render () {
    const channel = this.props.channel;
    
    const byCreator = channel.creator ?
      ` by ${channel.creator.username} ` : "";
    
    const date = new Date(channel.created_at);
    const formattedDate = moment(date).format('MMMM Do, YYYY');
    const createdString = channel.created_at ?
      `Created ${byCreator} on ${formattedDate}` : "";
    
    const description = channel.description ?
      channel.description : "No description available";
    
    return (
      <div className="channel-details-list-border">
        <div className="channel-details-list-header"
          onClick={this.toggleCollapse}>
          <div className="flex">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
            <div>
              Channel Details
            </div>
          </div>
          <i className={`fa fa-caret-down ${this.props.collapsed ? "collapsed" : ""}`} aria-hidden="true"></i>
        </div>
        
        <div className={`channel-details-list-content info ${this.props.collapsed ? "collapsed" : ""}`}>
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

    );
  }
}

export default ChannelInfo;
