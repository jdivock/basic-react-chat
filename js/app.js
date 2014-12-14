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
    <BasicChatApp />,
    document.getElementById('BasicChatApp')
);
