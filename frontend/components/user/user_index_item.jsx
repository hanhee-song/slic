import React from 'react';

class UserIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {

  }
  
  render () {
    return (
        <div className="fullscreen-index-list-item-left user">
          <div className="profile-image">
            
          </div>
          <div className="fullscreen-index-list-item name">
            {this.props.user.username}
          </div>
        </div>
        <div className="fullscreen-index-list-item preview user">
          <i className="fa fa-plus-square-o" aria-hidden="true"></i>
        </div>
    );
  }
}

export default UserIndexItem;
