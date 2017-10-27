import React from 'react';
import onClickOutside from 'react-onclickoutside';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(this.state).then(
        response => {
          const id = response.channel.id;
          const user_id = this.props.currentUser.id;
          this.props.updateChannel({id, user_id});
          this.props.clearDropdown();
        }
      );
  }
  
  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }
  
  handleClose(e) {
    e.preventDefault();
    this.props.clearDropdown();
  }
  
  handleClickOutside(e) {
    this.props.clearDropdown();
  }
  
  render () {
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
            Create a channel
          </div>
          <div className="fullscreen-subheader">
            Channels are where your members communicate. They&rsquo;re best organized
            around a topic - #leads, for example.
          </div>
          <form
            className="channel-form-new"
            onSubmit={this.handleSubmit}>
            <input
              className="channel-form-input"
              type="text"
              onChange={this.handleChange("name")}
              value={this.state.name}
              placeholder="name"
              autoFocus />
            <textarea
              className="channel-form-input"
              onChange={this.handleChange("description")}
              value={this.state.description}
              placeholder="description" />
            <input
              className="channel-form-submit"
              type="submit"
              value="Create Channel"/>
          </form>
        </div>
      </div>
    );
  }
}

export default onClickOutside(ChannelForm);
