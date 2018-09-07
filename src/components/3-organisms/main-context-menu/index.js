import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { close, clickMenu } from '../../../ducks/modules/context-menus';
import Presenter from './presenter';

const mapStateToProps = state => ({
  onOff: state.contextMenus.onOff,
  x: state.contextMenus.x,
  y: state.contextMenus.y,
  theme: state.contextMenus.theme,
  selected: state.contextMenus.selected,
});

const mapDispatchToProps = dispatch => ({
  onClickMenu: ({ item }) => dispatch(clickMenu({ item })),
  onClickOutside: () => dispatch(close()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Presenter),
);
