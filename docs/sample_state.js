{
  entities: {
    channels: {
      1: { // current channel
        id: 1,
        name: 'asdf',
        description: 'asdfasdf',
        img_url: 'asdfasdf',
        user_ids: [6, 7, 8],
        message_ids: [4, 5]
      },
      2: {
        id: 2,
        name: 'asdf',
      },
      3: {
        id: 3,
        name: 'asdf',
      }
    },
    users: {
      6: {
        id: 6,
        username: 'asdfasdf',
        img_url: 'asdfasdf'
      }
      7: {
        id: 7,
        username: 'asdfasdf',
        img_url: 'asdfasdf'
      },
      8: {
        id: 8,
        username: 'asdfasdf',
        img_url: 'asdfasdf'
      }
    },
    
    messages: {
      4: {
        id: 4,
        body: 'asdf',
        user_id: 1,
        channel_id: 1,
        time: timestamp,
        child_comment_ids: [6, 7],
      },
      5: {
        id: 5
        body: 'asdf',
        user_id: 1,
        channel_id: 1,
        time: timestamp,
        child_comment_ids: []
      }
    }
  },
  
  ui: {
    dropdown: [],
    loading: true,
    currentChannel: 1,
    modal: true,
  }
  
  errors: {
    session: ['Invalid credentials'],
    messageForm: ["Message can't be blank"],
    channelForm: ["Name can't be blank"],
    channelSubscriptions: ["User is already in channel"]
  }
  
  session: {
    currentUser: {
      id: 1,
      username: 'asdf',
      img_url: 'asdfasdf'
    }
  }
}
