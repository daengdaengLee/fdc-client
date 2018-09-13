import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button } from 'antd';

const DropdownButton = ({ overlay, style, children }) => (
  <Dropdown overlay={overlay} trigger={['click']}>
    <Button
      style={{
        width: '160px',
        marginLeft: '10px',
        borderRadius: '0',
        border: '0',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        ...style,
      }}
    >
      {children}
    </Button>
  </Dropdown>
);

DropdownButton.defaultProps = {
  overlay: <div />,
  style: {},
  children: null,
};

DropdownButton.propTypes = {
  overlay: PropTypes.node,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default DropdownButton;
