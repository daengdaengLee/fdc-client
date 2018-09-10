import { connect } from 'react-redux';
import { setSelected } from '../../../ducks/modules/parameters';
import {
  fetchStart,
  fetchSuccess,
  fetchFail,
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
  };
};

const mapDispatchToProps = dispatch => ({
  onClickParam: param => dispatch(setSelected({ selected: [param] })),
  onFetchStart: () => dispatch(fetchStart()),
  onFetchSuccess: () => dispatch(fetchSuccess()),
  onFetchFail: () => dispatch(fetchFail()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
