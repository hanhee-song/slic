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
      <div className="channel-form-container">
        <div
          className="channel-form-new">
          Channel Form
          <form onSubmit={this.handleSubmit}>
            <div onClick={this.handleClose}>
              x
            </div>
            <input
              type="text"
              onChange={this.handleChange("name")}
              value={this.state.name} />
            <input
              type="text"
              onChange={this.handleChange("description")}
              value={this.state.description} />
            <input
              type="submit"
              value="Create Channel"/>
          </form>
        </div>
      </div>
    );
  }
}

export default ChannelForm;
