import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { open } from '../../../ducks/modules/context-menus';
import {
  setSelectedRowKeys,
  selectBy,
  pushTableFilter,
  popTableFilter,
  resetTableFilters,
  clickViewTraceDataTime,
} from '../../../ducks/modules/histories';
import Presenter from './presenter';

const mapStateToProps = state => ({
  rows: state.histories.rows,
  columns: state.histories.columns,
  by: state.histories.by,
  selectedRows: state.histories.selectedRowKeys,
  tableFilters: state.histories.tableFilters,
  location: state.routes.location,
});

const mapDispatchToProps = dispatch => ({
  onOpenContextMenu: ({ x, y }) =>
    dispatch(open({ x, y, theme: 'HISTORY_TABLE' })),
  onSetSelectedRows: ({ keys }) => dispatch(setSelectedRowKeys({ keys })),
  onSelectBy: by => dispatch(selectBy({ by })),
  pushTableFilter: bindActionCreators(pushTableFilter, dispatch),
  popTableFilter: bindActionCreators(popTableFilter, dispatch),
  resetTableFilters: bindActionCreators(resetTableFilters, dispatch),
  onClickViewTraceDataTime: bindActionCreators(
    clickViewTraceDataTime,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
