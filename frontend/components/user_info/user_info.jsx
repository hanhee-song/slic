import React from 'react';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div className="sidebar-button button">
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
    );
  }
}


export default UserInfo;
