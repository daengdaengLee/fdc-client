import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from 'antd';
import '../../../index.css';

const ContextMenuBox = styled.ul.attrs({
  style: props => ({
    left: props.left,
    top: props.top,
    width: props.width,
    maxWidth: props.width,
  }),
})`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #dedede;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  animation-name: ContextFadeIn;
  animation-duration: 0.1s;
  z-index: 50;
  box-shadow: 0 15px 35px rgba(50, 50, 90, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
`;

const ContextMenuItem = styled.li`
  display: flex;
  align-items: center;
  flex-grow: 1;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s;
  margin: 0;
  line-height: 30px;
  font-size: 12px;
  padding: 0 14px;
  color: ${props => (props.disabled ? '#bababa' : '#454545')}
  &:hover {
    background-color: ${props => (props.disabled ? '#fff' : '#f8f8f8')};
    ${props =>
    !props.disabled &&
      css`
        color: #04bed6;
      `};
  }
`;
// background-color: ${props => (props.disabled ? '#e0e0e0' : '#ffffff')};

class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this._onClickMenu = this._onClickMenu.bind(this);
  }

  render() {
    const { _onClickMenu } = this;
    const { width, x, y, items } = this.props;
    return (
      <ContextMenuBox className='context-menu' left={`${x}px`} top={`${y}px`} width={width}>
        {items.map(item => {
          return (
            <ContextMenuItem
              key={item.key}
              onClick={event => _onClickMenu(event, item)}
              disabled={item.disabled}
            >
              <Icon type={item.icon} />
              {item.name}
            </ContextMenuItem>
          );
        })}
      </ContextMenuBox>
    );
  }

  componentDidMount() {
    document.addEventListener('click', () => this.props.onClickOutside());
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.props.onClickOutside);
  }

  _onClickMenu(event, item) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    item.disabled || this.props.onClickMenu({ item: item.key });
  }
}

export default ContextMenu;
