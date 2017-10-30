import React from 'react';
// import UserIndexItemContainer from './user_index_item_container';

class UserIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose() {
    this.props.clearDropdown();
  }
  
  render () {
    // const users = this.props.users.reverse().map((user) => {
    //   return (
    //     <UserIndexItemContainer
    //       key={user.id}
    //       user={user} />
    //     );
    // });
    return (
      <div className="fullscreen-container">
        <div className="fullscreen-inside">
          <div
            className="fullscreen-x"
            onClick={this.handleClose}>
            <i className="fa fa-times" aria-hidden="true"></i>
            <div className="fullscreen-esc">esc</div>
          </div>
          <div className="fullscreen-header">
            Browse Users
          </div>
          <div className="fullscreen-subheader">
            Users you can join
          </div>
          <div className="user-index-list-container custom-scroll">
            <ul className="user-index-list">
              {undefined && users}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UserIndex;
