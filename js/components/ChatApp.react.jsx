/**
 *
 * @jsx React.DOM
 */

 'use strict';

var React = require('react/addons');

var ChatThreadMsg = React.createClass({
	render: function(){
		return (
			<div>
				<span>{this.props.user} ({this.props.ts}):</span>
				<span>{this.props.msg}</span>
			</div>
		);
	}
});

var ChatThreads = React.createClass({

	render: function(){
		console.log(this.props);

		var chatMsgs = this.props.chatData.map(function(msg){
			return (
				<ChatThreadMsg
					user={msg.user}
					ts={msg.ts}
					msg={msg.msg}
				/>
			);
		});

		return (
			<div className="chat-threads">
				{chatMsgs}
			</div>
		);
	}
});

var ChatEntry = React.createClass({

	// Don't forge to hook in 'enter' key listener to submit

	getInitialState: function(){
		return {
			entryMsg: ''
		};
	},
	setEntryMsg: function(){
		this.setState( {
			entryMsg: this.refs.entryMsg.getDOMNode().value 
		});
	},
	submitMsg: function(e){
		e.preventDefault();

		this.props.addMsg({
			user: this.props.user,
			ts: Date.now(),
			msg: this.state.entryMsg
		});

		this.setState({
			entryMsg: ''
		});
	},
	render: function(){
		return (
			<form className="chat-entry pure-form">
				<label>Msg:
					<input
						ref="entryMsg"
						placeholder="Enter Message . . . "
						onChange={this.setEntryMsg}
					/>
				</label>
				<button
					className="pure-button pure-button-primary"
					onClick={this.submitMsg}
				>
					Send
				</button>
			</form>
		);
	}
});


var ChatWindow = React.createClass({
	render: function(){
		return (
			<div className="chat-window">
				<ChatThreads 
					user={this.props.user}
					chatData={this.props.chatData}
				/>
				<ChatEntry 
					addMsg={this.props.addMsg}
					user={this.props.user}
				/>
			</div>
		);
	}

});



var BasicChatApp = React.createClass({
  
	// Start off with dummy data for now
	getInitialState: function(){
		return {
			chatData: 
				[
					{
						user: 'Abby',
						ts: Date.now(),
						msg: 'Hey Bob'
					},
					{
						user: 'Bob',
						ts: Date.now(),
						msg: 'Hey Abby'
					}

				]
		};
  },
  addMsg: function(msg){

  	var updatedChatData = React.addons.update( this.state.chatData, { $push: [msg]});

  	this.setState({
  		chatData: updatedChatData
  	});
  },
  render: function() {

    return (
      <div>
      	<ChatWindow 
      		chatData={this.state.chatData}
      		addMsg={this.addMsg}
      		user="Abby"
      	/>
      	<ChatWindow 
      		chatData={this.state.chatData}
      		user="Bob"
      	/>
      </div>
    );
  }

});


module.exports = BasicChatApp;
