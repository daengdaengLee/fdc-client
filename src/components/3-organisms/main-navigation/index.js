import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestFetch } from '../../../ducks/modules/trees';
import { open } from '../../../ducks/modules/context-menus';
import Presenter from './presenter';

const mapStateToProps = state => ({
  nodes: state.trees.nodes,
});

const mapDispatchToProps = dispatch => ({
  onRequestFetch: bindActionCreators(requestFetch, dispatch),
  onOpenContextMenu: ({ x, y }) =>
    dispatch(open({ x, y, theme: 'MODULE_TREE' })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
