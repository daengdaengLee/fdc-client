import React from 'react';
import PropTypes from 'prop-types';

const ColorBox = ({ size, color, style }) => (
  <span
    style={{
      display: 'inline-block',
      color,
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
      ...style,
    }}
  />
);

ColorBox.defaultProps = {
  size: '16px',
  color: '#1890ff',
  style: {},
};

ColorBox.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
};

export default ColorBox;
