import React from 'react';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
  
  render () {
    return (
      <div>
        <div>Channel Form</div>
        <form onSubmit={this.handleSubmit}>
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
    );
  }
}

export default ChannelForm;
