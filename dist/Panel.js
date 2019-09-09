'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

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

        const Button = _styledComponents2.default.button`
        margin-right: 5px;
        border-radius: 3px;
            background-color: ${props => props.value === props.currentTheme ? _styledComponents.css`
                    background-color: #696969;
                ` : _styledComponents.css`
                    background-color: #A9A9A9;
                `}
        /* Green background */
        border: 1px solid white;
        /* Green border */
        color: white;
        /* White text */
        padding: 10px 24px;
        /* Some padding */
        cursor: pointer;
        /* Pointer/hand icon */
        float: left;
        /* Float the buttons side by side */
        &:not(:last-child) {
            border-right: none;
            /* Prevent double borders */
        }
        &:hover {
            background-color: #696969;
        }
    `;

        const Div = _styledComponents2.default.div`
        &:after {
            content: "";
            clear: both;
            display: table;
        }
    `;
        const Paragraph = _styledComponents2.default.p`
        padding-top: 10px;
        padding-bottom: 10px;

    `;

        return _react2.default.createElement(
            Div,
            null,
            _react2.default.createElement(
                Paragraph,
                null,
                'Current Theme: ',
                this.state.theme
            ),
            Object.keys(themes).map(theme => _react2.default.createElement(
                Button,
                { key: theme, value: theme, currentTheme: this.state.theme, onClick: this.updateTheme },
                theme
            ))
        );
    }
}
exports.default = Panel;