import { connect } from 'react-redux';
import {
  clickNode,
  clickFab,
  setSelectedNodes,
  clickLotWaferView,
  clickRealTimeView,
} from '../../../ducks/modules/trees';
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
  onOpenContextMenu: ({ x, y }) =>
    dispatch(open({ x, y, theme: 'MODULE_TREE' })),
  onSelectFrom: date => dispatch(selectFrom({ date })),
  onSelectTo: date => dispatch(selectTo({ date })),
  onClickNode: node => dispatch(clickNode({ node })),
  onClickFab: fab => dispatch(clickFab({ fab })),
  onResetSelectedNodes: () => dispatch(setSelectedNodes({ nodes: [] })),
  onClickLotWaferView: () => dispatch(clickLotWaferView()),
  onClickRealTimeView: () => dispatch(clickRealTimeView()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
