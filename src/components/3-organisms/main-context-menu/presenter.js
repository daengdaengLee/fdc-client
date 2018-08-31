import React from 'react';
import ContextMenu from '../../2-molecules/context-menu';

const calcWidth = theme => {
  switch (theme) {
  case 'table':
    return '300px';
  case 'tree':
    return '200px';
  default:
    return '300px';
  }
};

const selectItems = theme => {
  switch (theme) {
  case 'table':
    return [
      {
        name: 'View Trace Data(Time)',
        icon: 'area-chart',
        key: 'TRACE_TIME',
      },
      { name: 'View Trace Data(Lot)', icon: 'pie-chart', key: 'TRACE_LOT' },
      {
        name: 'View Trace Data(Overlay)',
        icon: 'dot-chart',
        key: 'TRACE_OVERLAY',
      },
    ];
  case 'tree':
    return [
      { name: 'Real Time View', icon: 'star-o', key: 'VIEW_REAL_TIME' },
      { name: 'Lot/Wafer View', icon: 'star-o', key: 'VIEW_LOT_WAFER' },
    ];
  default:
    return [];
  }
};

const MainContextMenu = ({ onOff, x, y, theme, onClickMenu, onClickOutside }) =>
  onOff && (
    <ContextMenu
      width={calcWidth(theme)}
      items={selectItems(theme)}
      x={x}
      y={y}
      onClickMenu={onClickMenu}
      onClickOutside={onClickOutside}
    />
  );

export default MainContextMenu;
