import React from 'react';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      is_private: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.clearChannelErrors();
    this.props.createChannel(this.state).then(
        response => {
          const id = response.channel.id;
          const user_id = this.props.currentUser.id;
          this.props.subscribeUserIdsToChannel(response.channel, [this.props.currentUser.id]);
          this.props.rememberCurrentChannelId(
            this.props.currentUser, response.channel.id);
          this.handleClose();
          this.props.history.push(`/channels/${response.channel.id}`);
        }
      );
  }
  
  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }
  
  handleSwitch(e) {
    this.setState({ is_private: !this.state.is_private });
  }
  
  handleClose() {
    this.props.clearChannelErrors();
    this.props.clearDropdown();
  }
  
  handleClickOutside(e) {
    this.props.clearDropdown();
  }
  
  render () {
    const errors = this.props.errors.map((error, idx) => {
      if (error === "Name can't be blank") {
        error = "Don't forget to name your channel";
      }
      return (
        <li key={idx}>
          {error}
        </li>
      );
    });
    
    const errorFlag = this.props.errors.length > 0 ? "-error" : "";
    
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
            { this.state.is_private ?
              "Create a private channel"
              :
              "Create a channel"
            }
          </div>
          <div className="fullscreen-subheader">
            Channels are where your members communicate. They&rsquo;re best organized
            around a topic - #leads, for example.
          </div>
          <form
            className="channel-form-new"
            onSubmit={this.handleSubmit}>
            <div className="fullscreen-input-switch-container">
              <label className="fullscreen-input-switch-box">
                <input
                  className="fullscreen-input-switch-checkbox"
                  value={'asdf'}
                  checked={this.state.is_private}
                  onChange={this.handleSwitch}
                  type="checkbox" />
                <div className="fullscreen-input-switch-slider"></div>
                <div className="fullscreen-input-switch-word">
                  { this.state.is_private ?
                    "Private" : "Public"
                  }
                </div>
              </label>
              <div className="fullscreen-input-switch-text">
                { this.state.is_private ?
                  "This channel can only be joined or viewed by invite."
                  :
                  "Anyone in your workspace can view and join this channel."
                }
              </div>
            </div>
            
            <div className="fullscreen-input-container">
              <div className="fullscreen-input-header">
                <div className="fullscreen-input-title">
                  Name
                </div>
                { errors.length > 0 &&
                  <div className="fullscreen-popup-errors">
                    {errors}
                  </div>
                }
              </div>
              <input
                className={`channel-form-input${errorFlag}`}
                type="text"
                onChange={this.handleChange("name")}
                value={this.state.name}
                placeholder="e.g. leads"
                autoFocus />
            </div>
            
            <div className="fullscreen-input-container">
              <div className="fullscreen-input-header">
                <div className="fullscreen-input-title">
                  Purpose
                </div>
                <div className="fullscreen-input-optional">
                  (optional)
                </div>
              </div>
              <input
                type="text"
                className="channel-form-input"
                onChange={this.handleChange("description")}
                value={this.state.description}/>
            </div>
            
            <div
              className="channel-form-button-container">
              <div
                className="channel-form-cancel"
                onClick={this.handleClose}>
                Cancel
              </div>
              
              <input
                className="channel-form-submit"
                type="submit"
                value="Create Channel"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ChannelForm;
