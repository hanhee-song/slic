import React from 'react';

class UserIndexItem extends React.Component {
  render () {
    return (
      <div
        onClick={this.props.handleAddUser(this.props.user)}
        className="fullscreen-index-list-li"
        key={this.props.user.id}>
        <div className="fullscreen-index-list-item-left user">
          <img className="profile-image"
              src={this.props.user.avatar_url} />
          <div className="fullscreen-index-list-item name">
            {this.props.user.username}
          </div>
        </div>
        <div className="fullscreen-index-list-item preview user">
          <i className="fa fa-plus-square-o" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default UserIndexItem;
