import { connect } from 'react-redux';
import { open } from '../../../ducks/modules/context-menus';
import { setSelectedRowKeys } from '../../../ducks/modules/histories';
import Presenter from './presenter';

const mapStateToProps = state => ({
  rows: state.histories.rows,
  columns: state.histories.columns,
});

const mapDispatchToProps = dispatch => ({
  onOpenContextMenu: ({ x, y }) =>
    dispatch(open({ x, y, theme: 'HISTORY_TABLE' })),
  onSetSelectedRows: ({ keys }) => dispatch(setSelectedRowKeys({ keys })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
