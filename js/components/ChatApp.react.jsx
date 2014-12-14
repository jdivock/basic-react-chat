/**
 *
 * @jsx React.DOM
 */

 'use strict';

var React = require('react');

var ChatThreads = React.createClass({
	render: function(){
		return (
			<div>
				Messages to Go here
			</div>
		);
	}
});

var ChatEntry = React.createClass({
	render: function(){
		return (
			<div>
				<label>Msg:</label>
				<input
					placeholder="Enter Message . . . "
				/>
			</div>
		);
	}
});


var ChatWindow = React.createClass({

	render: function(){
		return (
			<div>
				<ChatThreads />
				<ChatEntry />
			</div>
		);
	}

});



var BasicChatApp = React.createClass({
  render: function() {
    return (
      <div>
      	<ChatWindow user="Abby"/>
      	<ChatWindow user="Bob"/>
      </div>
    );
  }

});


module.exports = BasicChatApp;
