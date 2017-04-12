// this is the file for the redux action creators
// consider adding an id to the message, ex in redux todos
const sendMessage = message => ({
  type: 'SEND_MESSAGE',
  message
});

export default sendMessage;
