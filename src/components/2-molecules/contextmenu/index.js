import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import '../../../index.css';

const ContextmenuBox = styled.ul`
  width: 200px;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .15);
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  animation-name: ContextFadeIn;
  animation-duration: .4s;
  z-index: 50;
  box-shadow:
    0 15px 35px rgba(50,50,90,0.1),
    0 5px 15px rgba(0,0,0,0.07);
`;

const ContextmenuItem = styled.li`
  display: flex;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;
  transition: all .3s;
  margin: 0;
  &:hover {
    background-color: rgb(244, 245, 250);
  }
`;

class Contextmenu extends Component {
  render() {
    const { visible, x, y, items, onClickMenu } = this.props;
    return visible && (
      <ContextmenuBox style={{left: `${x}px`, top: `${y}px`}}>
        {
          items.map((item) => {
            return (
              <ContextmenuItem 
                key={item.name} 
                onClick={(e) => onClickMenu({ ...e, _key: item.key })}>
                <Icon type={item.icon}/>
                {item.name}
              </ContextmenuItem>);
          })
        }
      </ContextmenuBox>
    );
  }

  componentDidMount() {
    document.addEventListener('click', this.props.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.props.onClickOutside);
  }
}

export default Contextmenu;
