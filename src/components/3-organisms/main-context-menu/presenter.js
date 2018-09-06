import React from 'react';
import ContextMenu from '../../2-molecules/context-menu';

const calcWidth = theme => {
  switch (theme) {
  case 'HISTORY_TABLE':
    return '300px';
  case 'MODULE_TREE':
    return '200px';
  default:
    return '300px';
  }
};

const selectItems = theme => {
  switch (theme) {
  case 'HISTORY_TABLE':
    return [
      {
        name: 'View Trace Data(Time)',
        icon: 'area-chart',
        key: 'HISTORY_TABLE/TIME',
      },
      {
        name: 'View Trace Data(Lot)',
        icon: 'pie-chart',
        key: 'HISTORY_TABLE/LOT',
      },
      {
        name: 'View Trace Data(Overlay)',
        icon: 'dot-chart',
        key: 'HISTORY_TABLE/OVERLAY',
      },
    ];
  case 'MODULE_TREE':
    return [
      {
        name: 'Real Time View',
        icon: 'star-o',
        key: 'MODULE_TREE/REAL_TIME',
      },
      {
        name: 'Lot/Wafer View',
        icon: 'star-o',
        key: 'MODULE_TREE/LOT_WAFER',
      },
    ];
  default:
    return [];
  }
};

const MainContextMenu = ({
  history,
  onOff,
  x,
  y,
  selected,
  theme,
  onClickMenu,
  onClickOutside,
}) =>
  onOff && (
    <ContextMenu
      width={calcWidth(theme)}
      items={selectItems(theme)}
      x={x}
      y={y}
      selected={selected}
      onClickMenu={({ event, item }) => onClickMenu({ event, item, history })}
      onClickOutside={onClickOutside}
    />
  );

export default MainContextMenu;
