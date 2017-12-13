import React from 'react';
import MessageIndexItemContainer from './message_index_item_container';
import MessageFormContainer from './message_form_container';
import MessageIndexBeginning from './message_index_beginning';

class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.initializeChannel = this.initializeChannel.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.channelId !== nextProps.match.params.channelId) {
      this.initializeChannel(nextProps.match.params.channelId);
      pusher.unsubscribe(`channel-connection-${this.props.match.params.channelId}`);
    }
  }
  
  componentDidMount() {
    this.initializeChannel(this.props.match.params.channelId);
  }
  
  initializeChannel(id) {
    this.setState({ loaded: false });
    this.props.fetchMessages(id)
    .then(success => {
      this.setState({ loaded: true });
      this.scrollBottom();
    });
    const channel = pusher.subscribe(`channel-connection-${id}`);
    channel.bind('create-message', (message) => {
      this.setScrollBottom();
      this.props.receiveMessage(message);
    });
  }
  
  setScrollBottom() {
    const wrapper = document.querySelector('.message-index-overflow-wrapper');
    if (wrapper.scrollTop + wrapper.offsetHeight + 72 > wrapper.scrollHeight) {
      setTimeout(() => {
        this.scrollBottom();
      }, 0);
    }
  }
  
  scrollBottom() {
    const wrapper = document.querySelector('.message-index-overflow-wrapper');
    wrapper.scrollTop = wrapper.scrollHeight;
    setTimeout(function () {
      const wrapper = document.querySelector('.message-index-overflow-wrapper');
      wrapper.scrollTop = wrapper.scrollHeight;
    }, 0);
  }
  
  componentWillUnmount() {
    pusher.unsubscribe(`channel-connection-${this.props.match.params.channelId}`);
  }
  
  generateDate(date) {
    const today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    let time;
    if (today.getMonth() === date.getMonth()
      && today.getDate() === date.getDate()
      && today.getYear() === date.getYear()) {
      time = "Today";
    } else if (yesterday.getMonth() === date.getMonth()
      && yesterday.getDate() === date.getDate()
      && yesterday.getYear() === date.getYear()) {
      time = "Yesterday";
    } else {
      const thisMonth = "January February March April May June July August September October November December".split(' ')[date.getMonth()];
      const thisDay = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(' ')[date.getDay()];
      time = `${thisDay}, ${thisMonth} ${date.getDate()}`;
    }
    return time;
  }
  
  render () {
    const channel = this.props.channel;
    
    let messages = [];
    messages.push(
      <MessageIndexBeginning
        key={"beginning"}
        channel={channel}
        currentUser={this.props.currentUser} />
    );
    for (let i = 0; i < this.props.messages.length; i++) {
      let message = this.props.messages[i];
      let prevMessage = this.props.messages[i - 1] || {};
      let thisDate = new Date(message.created_at);
      let nextDate = new Date(prevMessage.created_at) || {};
      if (thisDate.getDate() !== nextDate.getDate()
        || thisDate.getMonth() !== nextDate.getMonth()
        || thisDate.getYear() !== nextDate.getYear()) {
        
        let date = this.generateDate(thisDate);
        
        messages.push(
          <div className="message-index-divider-line"
            key={`${message.id}l`}>
          </div>
        );
        messages.push(
          <div
            className="message-index-divider"
            key={-message.id}>
            <div className="message-index-divider-text">
              {date}
            </div>
          </div>
        );
      }
      
      messages.push(
        <MessageIndexItemContainer
          key={message.id}
          message={message}/>
      );
    }
    
    return (
      <div className="message-container">
        <div className="message-index-overflow-wrapper custom-scroll">
          {
            !this.state.loaded &&
            <div className="message-index-loading-wrapper">
              <div className="sk-circle">
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
              </div>
            </div>
          }
          <div className="message-index">
            { this.state.loaded && messages }
          </div>
          
        </div>
        <MessageFormContainer
          channel={channel} />
      </div>
    );
  }
}

export default MessageIndex;
