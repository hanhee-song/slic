import React from 'react';
import UserDropdownContainer from './user_dropdown_container';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e) {
    this.props.receiveDropdown("userInfo");
  }

  render () {
    let userDropdown;
    if (this.props.dropdown === "userInfo") {
      userDropdown = (
        <UserDropdownContainer />
      );
    }
    
    return (
      <div>
        <div
          className="sidebar-button button"
          onClick={this.handleClick}>
          <div className="sidebar-button-title">
            Workspace
          </div>
          
          <div className="sidebar-button-subtitle">
            <div className="sidebar-button-status">
              <i className="fa fa-circle"></i>
            </div>
            <div className="sidebar-button-name">
              {this.props.currentUser.username}
            </div>
          </div>
        </div>
        {userDropdown}
      </div>
    );
  }
}


export default UserInfo;
