import React from 'react';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchChannels();
  }
  
  
  
  render () {
    return (
      <div>this is a channel index</div>
    );
  }
}

export default ChannelIndex;
