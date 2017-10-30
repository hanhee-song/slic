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
      <div className="channel-index-list-li">
        <div className="channel-index-list-item-left">
          <div className="channel-index-list-item name">
            {this.props.user.username}
          </div>
        </div>
        <div className="channel-index-list-item preview">
          <i class="fa fa-sign-in" aria-hidden="true"></i>
          <div>join</div>
        </div>
      </div>
    );
  }
}

export default UserIndexItem;
