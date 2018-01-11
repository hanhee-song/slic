import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
    const date = new Date(this.props.channel.created_at);
    return moment(date).format('MMMM Do, YYYY');
  }

  timeAgo() {
    const date = new Date(this.props.channel.most_recent_activity);
    return moment(date).fromNow();
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
            src={this.props.channel.avatar_url} />
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
