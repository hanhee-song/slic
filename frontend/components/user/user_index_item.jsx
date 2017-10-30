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
      <div className="fullscreen-index-list-li">
        <div className="fullscreen-index-list-item-left">
          <div className="fullscreen-index-list-item name">
            {this.props.user.username}
          </div>
        </div>
        <div className="fullscreen-index-list-item preview">
          <i class="fa fa-plus-square-o" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default UserIndexItem;
