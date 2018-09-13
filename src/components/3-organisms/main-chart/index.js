import { connect } from 'react-redux';
import { clickParam } from '../../../ducks/modules/parameters';
import {
  fetchStart,
  fetchSuccess,
  fetchFail,
  toggleTickLabel,
  setChartEl,
  clickZoomReset,
} from '../../../ducks/modules/charts';
import Presenter from './presenter';

const mapStateToProps = state => {
  const selectedHistory = state.histories.rows.find(
    row => row.key === state.histories.selectedRowKeys[0],
  );
  return {
    parameters: state.parameters.params,
    selectedParams: state.parameters.selected,
    fab: state.trees.fab,
    mod: state.trees.selected[0],
    from: state.dates.from,
    to: state.dates.to,
    lot: selectedHistory ? selectedHistory.LOT_ID : '',
    location: state.routes.location,
    tickLabels: state.charts.tickLabels,
  };
};

const mapDispatchToProps = dispatch => ({
  onClickParam: param => dispatch(clickParam({ param })),
  onFetchStart: () => dispatch(fetchStart()),
  onFetchSuccess: () => dispatch(fetchSuccess()),
  onFetchFail: () => dispatch(fetchFail()),
  onToggleTickLabel: (id, label, onOff) =>
    dispatch(toggleTickLabel({ id, label, onOff })),
  onSetChartEl: (id, el) => dispatch(setChartEl({ el, id })),
  onZoomReset: id => dispatch(clickZoomReset({ id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
