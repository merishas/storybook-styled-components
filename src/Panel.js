import React from 'react';
import styled from 'styled-components';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      theme: null,
      themes: {},
      initialised: false,
    };

    this.onInit = this.onInit.bind(this)
    this.updateTheme = this.updateTheme.bind(this)

    this.props.channel.on('storybook-styled-components:init', this.onInit);
  }

  componentWillUnmount() {
    this.props.channel.removeListener('storybook-styled-components:init', this.onInit);
  }

  onInit(themes) {
    const queryTheme = this.props.api.getQueryParam('currentTheme')

    const theme = queryTheme
      ? queryTheme
      : this.state.theme ? this.state.theme : Object.keys(themes)[0]

    this.setTheme(themes, theme)
  }

  updateTheme(theme) {
    this.setTheme(this.state.themes, theme)
  }

  setTheme(themes, theme) {
    this.setState({ themes, theme })
    this.props.channel.emit('storybook-styled-components:update', theme)
    this.props.api.setQueryParams({ currentTheme: theme })
  }

  render() {
    if(!this.props.active) return (null);

    const { theme, themes } = this.state

    if (!theme) return <div>Addon is initialising</div>

    const Button = styled.button`
        background-color: #5BC1EE;
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
            background-color: #DD356F;
        }
    `;

    const Div = styled.div`
        &:after {
            content: "";
            clear: both;
            display: table;
        }
    `;

    return (
        <Div>
            {Object.keys(themes).map(theme => (
                <Button key={theme} onChange={() => this.updateTheme(theme)}>{theme}</Button>
          ))}
        </Div>
      
    )
  }
}
