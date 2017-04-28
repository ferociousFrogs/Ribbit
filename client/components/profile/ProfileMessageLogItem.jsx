import React from 'react';
import { connect } from 'react-redux';
// []should have consistent styling with the chat message component
// []display each message appropriately so messages from me and from partner are separate

const ProfileMessageLogItem = props => (
  <div>
    { props.message.user1name === props.userName ?
      <div className="chat-message-container-me">
        <span className="pull-left">
          <img src="http://placehold.it/50/00A5D2/fff&text=ME" alt="User Avatar" className="img-circle" />
        </span>
        <div className="chat-name-from-me chat-text-color"><strong>{props.userName}</strong></div>
        <div className="chat-text-from-me chat-text-color">{props.message.data}</div>
      </div>
      :
      <div className="chat-message-container-other">
        <span className="pull-right">
          <img src="http://placehold.it/50/FF7473/fff&text=YOU" alt="User Avatar" className="img-circle" />
        </span>
        <div className="chat-name-from-other chat-text-color"><strong>{props.message.user1name}</strong></div>
        <div className="chat-text-from-other chat-text-color">{props.message.data}</div>
      </div>
    }
  </div>
);

const mapStateToProps = state => ({
  userName: state.userName
});

export default connect(mapStateToProps, null)(ProfileMessageLogItem);
