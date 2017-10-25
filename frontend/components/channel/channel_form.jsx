import React from 'react';

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
    this.props.createChannel(this.state);
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
  
  render () {
    return (
      <div className="channel-form-absolute">
        <div className="channel-form-container">
          <div className="channel-form-header">
            Create a new Channel
          </div>
          <i
            className="channel-form-x fa fa-times"
            aria-hidden="true"
            onClick={this.handleClose}>
          </i>
          <form
            className="channel-form-new"
            onSubmit={this.handleSubmit}>
            <input
              className="channel-form-input"
              type="text"
              onChange={this.handleChange("name")}
              value={this.state.name}
              placeholder="name" />
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

export default ChannelForm;
