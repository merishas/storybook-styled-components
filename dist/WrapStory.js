'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WrapStory extends _react2.default.Component {

  constructor(props) {
    super(props);
    const keys = Object.keys(props.themes);
    this.state = { theme: props.themes[keys[0]] };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.props.channel.emit('storybook-styled-components:init', this.props.themes);
    this.props.channel.on('storybook-styled-components:update', this.updateState);
  }

  componentWillUnmount() {
    this.props.channel.removeListener('storybook-styled-components:init', this.props.themes);
    this.props.channel.removeListener('storybook-styled-components:update', this.updateState);
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  updateState(theme) {
    const { themes } = this.props;
    this.setState({ theme: themes[theme] });
  }

  render() {
    const { children, GlobalStyle } = this.props;
    const { theme } = this.state;
    return theme ? _react2.default.createElement(
      _styledComponents.ThemeProvider,
      { theme: theme },
      _react2.default.createElement(
        _react.Fragment,
        null,
        children,
        GlobalStyle && _react2.default.createElement(GlobalStyle, null)
      )
    ) : children;
  }
}
exports.default = WrapStory;