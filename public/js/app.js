/**
 *
 * @jsx React.DOM
 */

var BasicChatApp = require('./components/ChatApp.react');
var React = require('react');

require('../styles/pure.css');
require('../styles/main.scss');

// Enable dev tools
window.React = React;

React.renderComponent(
    <BasicChatApp UserOne="Abby" UserTwo="Bob"/>,
    document.getElementById('basic-chat-app')
);
