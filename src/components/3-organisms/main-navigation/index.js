import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestFetch, selectNode, selectFab } from '../../../ducks/modules/trees';
import { open } from '../../../ducks/modules/context-menus';
import { selectFrom, selectTo } from '../../../ducks/modules/dates';
import Presenter from './presenter';

const mapStateToProps = state => ({
  fab: state.trees.fab,
  nodes: state.trees.nodes,
  selected: state.trees.selected,
  from: state.dates.from,
  to: state.dates.to,
});

const mapDispatchToProps = dispatch => ({
  onRequestFetch: bindActionCreators(requestFetch, dispatch),
  onOpenContextMenu: ({ x, y }) =>
    dispatch(open({ x, y, theme: 'MODULE_TREE' })),
  onSelectFrom: date => dispatch(selectFrom({ date })),
  onSelectTo: date => dispatch(selectTo({ date })),
  onSelectNode: selectedNodes => dispatch(selectNode({ selectedNodes })),
  onSelectFab: fab => dispatch(selectFab({ fab })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
