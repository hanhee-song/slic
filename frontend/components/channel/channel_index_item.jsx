import React from 'react';

class ChannelIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchChannel(this.props.channel.id);
  }
  
  render () {
    return (
      <div
        onClick={this.props.clearDropdown}>
        {this.props.channel.name}
      </div>
    );
  }
}

export default ChannelIndexItem;
