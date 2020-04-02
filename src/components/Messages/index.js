import React, { Component } from 'react';
import TextMessage from './TextMessage';
import EmojiMessage from './EmojiMessage';
import FileMessage from './FileMessage';
import Identicon from 'identicon.js';
import md5 from 'md5';


class Message extends Component {

  _renderMessageOfType(type) {
    switch(type) {
    case 'text':
      return <TextMessage {...this.props.message} />;
    case 'emoji':
      return <EmojiMessage {...this.props.message} />;
    case 'file':
      return <FileMessage {...this.props.message} />;
    default:
      console.error(`Attempting to load message with unsupported file type '${type}'`);
    }
  }

  render () {
    let options = {
      size : 80
    }
    var data = new Identicon(md5(this.props.message.sender), options).toString();
    let chatIconUrl = "data:image/png;base64," + data 
    let contentClassList = [
      'sc-message--content',
      (this.props.message.author === 'me' ? 'sent' : 'received')
    ];
    return (
      <div className="sc-message">
        <div className={contentClassList.join(' ')}>
          <div className="sc-message--avatar" style={{
            backgroundImage: `url(${chatIconUrl})`
          }}></div>
          
          {this._renderMessageOfType(this.props.message.type)}
        </div>
      </div>);
  }
}

export default Message;
