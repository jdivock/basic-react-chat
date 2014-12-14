/**
 *
 * @jsx React.DOM
 */

var BasicChatApp = require('./components/ChatApp.react');
var React = require('react');


React.renderComponent(
    <BasicChatApp />,
    document.getElementById('BasicChatApp')
);
