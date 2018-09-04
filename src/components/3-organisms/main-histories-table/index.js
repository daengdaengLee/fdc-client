import { connect } from 'react-redux';
import { open } from '../../../ducks/modules/context-menus';
import { setSelectedRowKeys, selectBy } from '../../../ducks/modules/histories';
import Presenter from './presenter';

const mapStateToProps = state => ({
  rows: state.histories.rows,
  columns: state.histories.columns,
  by: state.histories.by,
});

const mapDispatchToProps = dispatch => ({
  onOpenContextMenu: ({ x, y }) =>
    dispatch(open({ x, y, theme: 'HISTORY_TABLE' })),
  onSetSelectedRows: ({ keys }) => dispatch(setSelectedRowKeys({ keys })),
  onSelectBy: by => dispatch(selectBy({ by })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
