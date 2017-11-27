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
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.channelId !== nextProps.match.params.channelId) {
      this.setState({ loaded: false });
      this.props.fetchMessages(nextProps.match.params.channelId)
        .then(success => {
          this.setState({ loaded: true });
          this.scrollBottom();
        });
      pusher.unsubscribe(`channel-connection-${this.props.match.params.channelId}`);
      
      var channel = pusher.subscribe(`channel-connection-${nextProps.match.params.channelId}`);
      channel.bind('create-message', (message) => {
        this.props.receiveMessage(message);
      });
    }
  }
  
  componentDidMount() {
    this.props.fetchMessages(this.props.match.params.channelId)
      .then(success => {
        this.setState({ loaded: true });
        this.scrollBottom();
      });
    var channel = pusher.subscribe(`channel-connection-${this.props.match.params.channelId}`);
    channel.bind('create-message', (message) => {
      const wrapper = document.querySelector('.message-index-overflow-wrapper');
      console.log(wrapper.scrollTop + 350, wrapper.scrollHeight);
      if (wrapper.scrollTop + 350 > wrapper.scrollHeight) {
        setTimeout(() => {
          this.scrollBottom();
        }, 0);
      }
      this.props.receiveMessage(message);
      
    });
    
  }
  
  scrollBottom() {
    // setTimeout(function () {
      const wrapper = document.querySelector('.message-index-overflow-wrapper');
      wrapper.scrollTop = wrapper.scrollHeight;
    // }, 0);
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
    let messages = [];
    for (var i = 0; i < this.props.messages.length; i++) {
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
    
    const channel = this.props.channel;
    
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
            { channel.id && this.state.loaded &&
              <MessageIndexBeginning
                channel={channel}
                currentUser={this.props.currentUser} />
            }
            {messages}
          </div>
          
        </div>
        <MessageFormContainer
          channel={channel} />
      </div>
    );
  }
}

export default MessageIndex;
