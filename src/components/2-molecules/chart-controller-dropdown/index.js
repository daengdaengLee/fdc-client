import React from 'react';
import { Dropdown, Button, Icon } from 'antd';

const ChartControllerDropdown = ({ overlay, label }) => (
  <Dropdown overlay={overlay} trigger={['click']}>
    <Button
      style={{
        width: '160px',
        marginLeft: '10px',
        borderRadius: '0',
        border: '0',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {label}
      <Icon type="down" theme="outlined" style={{ paddingRight: '0' }} />
    </Button>
  </Dropdown>
);

export default ChartControllerDropdown;
