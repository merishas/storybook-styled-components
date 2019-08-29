'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_addons2.default.register('storybook-styled-components', api => {
  const channel = _addons2.default.getChannel();

  _addons2.default.addPanel('storybook-styled-components/panel', {
    title: 'Theme Picker',
    render: panelState => _react2.default.createElement(_Panel2.default, { channel: channel, api: api, key: 'theme-picker-panel', active: panelState.active })
  });
});