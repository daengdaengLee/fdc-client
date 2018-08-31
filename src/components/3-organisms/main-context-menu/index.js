import { connect } from 'react-redux';
import { close, clickMenu } from '../../../ducks/modules/context-menus';
import Presenter from './presenter';

const mapStateToProps = state => ({
  onOff: state.contextMenus.onOff,
  x: state.contextMenus.x,
  y: state.contextMenus.y,
  theme: state.contextMenus.theme,
});

const mapDispatchToProps = dispatch => ({
  onClickMenu: ({ event, item }) => dispatch(clickMenu({ event, item })),
  onClickOutside: () => dispatch(close()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
