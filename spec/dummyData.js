// dummy data file for testing

module.exports = {
  users: [
    {
      userName: 'Vito Cornelius',
      email: 'priest@5elements.com',
      fbToken: 300
    }, {
      userName: 'Korben Dallas',
      email: 'major@nyctaxi.com',
      fbToken: 100000000000000234
    }, {
      userName: 'Jean-Baptiste Emanuel Zorg',
      email: 'zorg@zorgcorp.zorg',
      fbToken: 666
    }, {
      userName: 'Leeloo',
      email: undefined,
      fbToken: 55555
    }, {
      userName: 'Ruby Rhod',
      email: 'ruby@rubyradio.org',
      fbToken: 123456789
    }
  ],
  rooms: [
    {
      roomName: 'Flosten Paradise'
    }, {
      roomName: 'Egyptian Pyramid'
    }, {
      roomName: 'Cornelius\'s Apt'
    }, {
      roomName: 'Airport'
    }, {
      roomName: 'Zorg Corp'
    }
  ],
  messages: [
    {
      roomName: 'Cornelius\'s Apt',
      userName: 'Korben Dallas',
      peerName: 'Vito Cornelius',
      roomId: 3,
      senderId: 2,
      receiverId: 1,
      type: 'message',
      data: 'You a priest'
    }, {
      roomName: 'Flosten Paradise',
      userName: 'Ruby Rhod',
      peerName: 'Korben Dallas',
      roomId: 1,
      senderId: 5,
      receiverId: 2,
      type: 'message',
      data: 'That was the best show I ever did'
    }, {
      roomName: 'Cornelius\'s Apt',
      userName: 'Vito Cornelius',
      peerName: 'Leeloo',
      roomId: 3,
      senderId: 1,
      receiverId: 4,
      type: 'message',
      data: 'Where are the stones?'
    }, {
      roomName: 'Zorg Corp',
      userName: 'Jean-Baptiste Emanuel Zorg',
      peerName: 'Vito Cornelius',
      roomId: 5,
      senderId: 3,
      receiverId: 1,
      type: 'message',
      data: 'Where. Are. The. Stones?'
    }, {
      roomName: 'Airport',
      userName: 'Leeloo',
      peerName: 'Korben Dallas',
      roomId: 4,
      senderId: 4,
      receiverId: 2,
      type: 'message',
      data: 'Leeloo Dallas mul-ti-pass.'
    }, {
      roomName: 'Airport',
      userName: 'Leeloo',
      peerName: 'Korben Dallas',
      roomId: 4,
      senderId: 4,
      receiverId: 2,
      type: 'code',
      data: "const peerDataArray = this.props.peerData[peer];console.log('peerDataArray in profile,', peerDataArray); let codeFlag = false; // separate messages from code const messages = peerDataArray.filter((data) => {if (data.type === 'code') {codeFlag = true; } if (data.type === 'message') {return data; } }).sort((a, b) => a.id - b.id);"
    }, {
      roomName: 'Airport',
      userName: 'Korben Dallas',
      peerName: 'Leeloo',
      roomId: 4,
      senderId: 2,
      receiverId: 4,
      type: 'message',
      data: 'Yeah, multipass, she knows it\'s a multipass. Leeloo Dallas. This is my wife.'
    }, {
      roomName: 'Airport',
      userName: 'Leeloo',
      peerName: 'Korben Dallas',
      roomId: 4,
      senderId: 4,
      receiverId: 2,
      type: 'message',
      data: 'Mul-ti-pass.'
    }, {
      roomName: 'Airport',
      userName: 'Korben Dallas',
      peerName: 'Leeloo',
      roomId: 4,
      senderId: 2,
      receiverId: 4,
      type: 'message',
      data: 'We\'re newlyweds. Just met. You know how it is. We bumped into each other, sparks happen...'
    }, {
      roomName: 'Airport',
      userName: 'Leeloo',
      peerName: 'Korben Dallas',
      roomId: 4,
      senderId: 4,
      receiverId: 2,
      type: 'message',
      data: 'Mul-ti-pass.'
    }, {
      roomName: 'Airport',
      userName: 'Korben Dallas',
      peerName: 'Leeloo',
      roomId: 4,
      senderId: 2,
      receiverId: 4,
      type: 'message',
      data: 'Yes, she knows it\'s a multipass. Anyway, we\'re in love.'
    }
  ],
  rooms_users: [
    {
      roomId: 3,
      userId: 2
    }, {
      roomId: 3,
      userId: 1
    }, {
      roomId: 1,
      userId: 5
    }, {
      roomId: 1,
      userId: 2
    }, {
      roomId: 3,
      userId: 1
    }, {
      roomId: 3,
      userId: 4
    }, {
      roomId: 5,
      userId: 3
    }, {
      roomId: 5,
      userId: 1
    }, {
      roomId: 4,
      userId: 4
    }, {
      roomId: 4,
      userId: 2
    }
  ]
};
