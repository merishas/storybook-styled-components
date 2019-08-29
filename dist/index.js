'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withThemes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _WrapStory = require('./WrapStory');

var _WrapStory2 = _interopRequireDefault(_WrapStory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const withThemes = exports.withThemes = (themes, GlobalStyle) => (storyFn, context) => {
  const channel = _addons2.default.getChannel();
  return _react2.default.createElement(
    _WrapStory2.default,
    {
      GlobalStyle: GlobalStyle,
      themes: themes,
      channel: channel
    },
    storyFn(context)
  );
};