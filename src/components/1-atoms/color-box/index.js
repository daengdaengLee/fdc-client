import React from 'react';
import PropTypes from 'prop-types';

const ColorBox = ({ size, backgroundColor, style }) => (
  <span
    style={{
      display: 'inline-block',
      backgroundColor,
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
  backgroundColor: '#1890ff',
  style: {},
};

ColorBox.propTypes = {
  size: PropTypes.string,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};

export default ColorBox;
