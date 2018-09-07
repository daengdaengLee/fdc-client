import React, { Component } from 'react';
import styled from 'styled-components';
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
  cursor: pointer;
  transition: all 0.3s;
  margin: 0;
  line-height: 30px;
  font-size: 12px;
  padding: 0 14px;
  &:hover {
    background-color: #f8f8f8;
    color: #69cedf;
  }
`;

class ContextMenu extends Component {
  render() {
    const { width, x, y, items, onClickMenu } = this.props;
    return (
      <ContextMenuBox left={`${x}px`} top={`${y}px`} width={width}>
        {items.map(item => {
          return (
            <ContextMenuItem
              key={item.key}
              onClick={event => onClickMenu({ event, item: item.key })}
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
    document.addEventListener('click', this.props.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.props.onClickOutside);
  }
}

export default ContextMenu;
