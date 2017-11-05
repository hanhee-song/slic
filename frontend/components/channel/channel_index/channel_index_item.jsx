import React from 'react';
import { Link } from 'react-router-dom';

class ChannelIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.date = this.date.bind(this);
    this.timeAgo = this.timeAgo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.handleClose();
    if (this.props.channel.is_dm) {
      this.props.makeChannelVisible(this.props.channel);
    }
  }
  
  date() {
    if (!this.props.channel.created_at) return "";
    
    let [year, month, day] = this.props.channel.created_at
      .split("T")[0].split("-");
    const months = "January February March April May June July August September October November December"
      .split(" ");
    const monthString = months[parseInt(month - 1)];
    let dayStr = day;
    day = parseInt(day);
    switch (dayStr[dayStr.length-1]) {
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
  
  timeAgo() {
    const date = new Date(this.props.channel.most_recent_activity);
    const now = new Date();
    
    // Surely there's a better way to do this...
    const timeDif = (
      now.getYear()*365*30*24*60 + now.getMonth()*30*24*60 +
      now.getDay()*24*60 + now.getHours()*60 + now.getMinutes()
    ) - (
      date.getYear()*365*30*24*60 + date.getMonth()*30*24*60 +
      date.getDay()*24*60 + date.getHours()*60 + date.getMinutes()
    );
    
    if (timeDif < 1) {
      return "less than a minute ago";
    } else if (timeDif < 60) {
      return `${Math.floor(timeDif)} minute${timeDif >= 2 ? "s" : ""} ago`;
    } else if (timeDif < 60 * 24) {
      const hours = timeDif / 60;
      return `${Math.floor(timeDif/24)} hour${hours >= 2 ? "s" : ""} ago`;
    } else if (timeDif < 60 * 24 * 30) {
      const days = timeDif / 60 / 24;
      return `${Math.floor(days)} day${days >= 2 ? "s" : ""} ago`;
    } else if (timeDif < 60 + 24 * 30 * 12) {
      const months = timeDif / 60 / 24 / 30;
      return `${Math.floor(months)} month${months >= 2 ? "s" : ""} ago`;
    } else {
      const years = timeDif / 60 / 24 / 30 / 365;
      return `${Math.floor(years)} year${years >= 2 ? "s" : ""} ago`;
    }
  }
  
  render () {
    const userCount = this.props.channel.user_count;
    let description;
    if (this.props.channel.description) {
      description = (
        <div className="fullscreen-index-list-item description">
          {this.props.channel.description}
        </div>
      );
    }
    
    const date = this.date();
    
    let prefix;
    if (this.props.channel.is_dm) {
      prefix = (
        <img className="profile-image"
            src={Object.values(this.props.channel.users)[0].avatar_url} />
      );
    } else {
      if (this.props.channel.is_private) {
        prefix = (
          <div className="fullscreen-index-list-item-symbol">
            <i className="fa fa-lock" aria-hidden="true"></i>&nbsp;
          </div>
        );
      } else {
        prefix = (
          <div className="fullscreen-index-list-item-symbol">
            #
          </div>
        );
      }
    }
    
    return (
      <Link
        className="fullscreen-index-list-li"
        to={`/channels/${this.props.channel.id}`}
        onClick={this.handleClick}>
        <div className="fullscreen-index-list-item-left">
          <div className="fullscreen-index-list-item title">
            {prefix}
            <div className="fullscreen-index-list-item name">
              {this.props.channel.name}
            </div>
          </div>
          
          { !this.props.channel.is_dm &&
            <div className="fullscreen-index-list-item date">
              Created on {date}
            </div>
          }
          {
            !this.props.channel.is_dm &&
            description
          }
        </div>
        { this.props.channel.is_dm ?
          <div className="fullscreen-index-list-item users">
            {this.timeAgo()}
          </div>
            :
          <div className="fullscreen-index-list-item users">
            <i className="fa fa-user-o" aria-hidden="true"></i> {userCount}
          </div>
        }
        <div className="fullscreen-index-list-item preview">
          <i className="fa fa-sign-in" aria-hidden="true"></i>
          <div>
            { !this.props.channel.subscribed &&
              "preview"
            }
          </div>
        </div>
      </Link>
    );
  }
}

export default ChannelIndexItem;
