import React from 'react';

class ChannelIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.date = this.date.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  // componentDidMount() {
  //   this.props.fetchChannel(this.props.channelId);
  // }
  
  handleClick() {
    this.props.makeChannelVisible(this.props.channel);
    this.props.clearDropdown();
  }
  
  date() {
    if (!this.props.channel.created_at) return "";
    
    let [year, month, day] = this.props.channel.created_at
      .split("T")[0].split("-");
    const months = "January February March April May June July August September October November December"
      .split(" ");
    const monthString = months[parseInt(month - 1)];
    
    switch (day[day.length-1]) {
      case "1":
        day += "st";
        break;
      case "2":
        day += "nd";
        break;
      case "3":
        day += "rd";
        break;
      default:
        day += "th";
    }
    
    return `${monthString} ${day}, ${year}`;
  }
  
  render () {
    const userCount = this.props.channel.user_count;
    let description;
    if (this.props.channel.description) {
      description = (
        <div className="channel-index-list-item description">
          {this.props.channel.description}
        </div>
      );
    }
    
    const date = this.date();
    
    return (
      <li
        className="channel-index-list-li"
        onClick={this.handleClick}>
        <div className="channel-index-list-item-left">
          <div className="channel-index-list-item title">
            <div className="channel-index-list-item hashtag">
              #
            </div>
            <div className="channel-index-list-item name">
              {this.props.channel.name}
            </div>
          </div>
          <div className="channel-index-list-item date">
            Created on {date}
          </div>
          {description}
        </div>
        <div className="channel-index-list-item users">
          <i className="fa fa-user-o" aria-hidden="true"></i> {userCount}
        </div>
      </li>
    );
  }
}

export default ChannelIndexItem;