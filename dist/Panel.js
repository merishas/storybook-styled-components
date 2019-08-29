'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Panel extends _react2.default.Component {

  constructor(props) {
    super(props);

    this.state = {
      theme: null,
      themes: {},
      initialised: false
    };

    this.onInit = this.onInit.bind(this);
    this.updateTheme = this.updateTheme.bind(this);

    this.props.channel.on('storybook-styled-components:init', this.onInit);
  }

  componentWillUnmount() {
    this.props.channel.removeListener('storybook-styled-components:init', this.onInit);
  }

  onInit(themes) {
    const queryTheme = this.props.api.getQueryParam('currentTheme');

    const theme = queryTheme ? queryTheme : this.state.theme ? this.state.theme : Object.keys(themes)[0];

    this.setTheme(themes, theme);
  }

  updateTheme(e) {
    this.setTheme(this.state.themes, e.target.value);
  }

  setTheme(themes, theme) {
    this.setState({ themes, theme });
    this.props.channel.emit('storybook-styled-components:update', theme);
    this.props.api.setQueryParams({ currentTheme: theme });
  }

  render() {
    if (!this.props.active) return null;

    const { theme, themes } = this.state;

    if (!theme) return _react2.default.createElement(
      'div',
      null,
      'Addon is initialising'
    );

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'select',
        { value: theme, onChange: this.updateTheme },
        Object.keys(themes).map(theme => _react2.default.createElement(
          'option',
          { key: theme, value: theme },
          theme
        ))
      )
    );
  }
}
exports.default = Panel;