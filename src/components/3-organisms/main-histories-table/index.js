import { connect } from 'react-redux';
import { open } from '../../../ducks/modules/context-menus';
import Presenter from './presenter';

const mapStateToProps = state => ({
  rows: state.histories.rows,
  columns: state.histories.columns,
});

const mapDispatchToProps = dispatch => ({
  onOpenContextMenu: ({ x, y }) =>
    dispatch(open({ x, y, theme: 'HISTORY_TABLE' })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
