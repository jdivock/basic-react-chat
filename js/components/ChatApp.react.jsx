/**
 *
 * @jsx React.DOM
 */

 'use strict';

var React = require('react/addons');
var moment = require('moment');
var debug = require('debug')('ChatApp.jsx');

/**
 * Builds individual chat messages for display. Simple date formatting logic with moment and I add a class
 * to fade the entry if it's coming from the user of origin ala good ole IRC
 *
 * Made use of the classSet addons which makes dynamic classing a bit less of a pain and more angular-y
 */ 
var ChatThreadMsg = React.createClass({
	render: function(){

		var formattedDate = moment(this.props.ts).format('MM/DD/YY HH:mm:ss');

		var cx = React.addons.classSet;

		var classes = cx({
			'chat-thread-msg': true,
			'chat-thread-self': this.props.user === this.props.currUser
		});

		return (
			<div className={classes}>
				<span className="user">{this.props.user}&nbsp;
					<span className="timestamp">({formattedDate})</span>:
				</span>
				<span className="msg">{this.props.msg}</span>
			</div>
		);
	}
});

/**
 * Displays chat threads, individual message formatting and constructions delegated to 
 * chat message helper
 * 
 * Known issue: Scroll position doesn't stay pinned to the bottom, I know the solution, but
 * I'm out of time
 * 
 * TODO: http://blog.vjeux.com/2013/javascript/scroll-position-with-react.html
 */
var ChatThreads = React.createClass({

	render: function(){
		debug(this.props);

		var chatMsgs = this.props.chatData.map(function(msg, idx){

			return (
				<ChatThreadMsg
					key={idx}
					currUser={this.props.user}
					user={msg.user}
					ts={msg.ts}
					msg={msg.msg}
				/>
			);
		}.bind(this));

		return (
			<div className="chat-threads">
				{chatMsgs}
			</div>
		);
	}
});

/**  
 * Listens for eitther form submit or keypress of send button to fire
 * off current value of entryMsg before resetting it.
 *
 * EntryMsg is updated when the <input> is updated and vice versa when I update the state
 * to blank the value
 */
var ChatEntry = React.createClass({
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

		// Don't submit empty entries
		if(!this.state.entryMsg){
			return;
		}

		this.props.addMsg({
			user: this.props.user,
			ts: Date.now(),
			msg: this.state.entryMsg
		});

		this.setState({
			entryMsg: null
		});
	},
	render: function(){
		return (
			<form className="chat-entry pure-form">
				<label>Msg:
					<input
						ref="entryMsg"
						value={this.state.entryMsg}
						placeholder="Enter Message . . . "
						onChange={this.setEntryMsg}
						onKeyDown={this.enterKeyCheck}
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

/**
 * Parent of the chat thread display and chat entry input
 * No real functionality, just a semantic container
 */
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


/**
 * Basic parent container that instantiates 2 chat windows
 * 1 with bob, 1 with abby
 * Owns the current chat threads, chat windows have to fire upwards to this component
 * to write new messages to the chat
 */ 
var BasicChatApp = React.createClass({
	// Start off with dummy data for now
	getInitialState: function(){
		return {
			chatData: 
				[
					{
						user: this.props.UserOne,
						ts: Date.now(),
						msg: 'Hey ' + this.props.UserTwo
					},
					{
						user: this.props.UserTwo,
						ts: Date.now(),
						msg: 'Hey ' + this.props.UserOne
					}
				]
		};
  },
  addMsg: function(msg){

  	// Hooray for immutability helpers. Can't modify state directly so cloning it
  	// with the new message pushed in
  	var updatedChatData = React.addons.update( this.state.chatData, { $push: [msg]});

  	this.setState({
  		chatData: updatedChatData
  	});
  },
  render: function() {

    return (
      <div>

      	<h3>Abby</h3>
      	<ChatWindow 
      		chatData={this.state.chatData}
      		addMsg={this.addMsg}
      		user={this.props.UserOne}
      	/>

      	<h3>Bob</h3>
      	<ChatWindow 
      		chatData={this.state.chatData}
      		addMsg={this.addMsg}
      		user={this.props.UserTwo}
      	/>
      </div>
    );
  }

});


module.exports = BasicChatApp;
