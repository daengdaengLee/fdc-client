import { connect } from 'react-redux';
import { setSelected } from '../../../ducks/modules/parameters';
import Presenter from './presenter';

const mapStateToProps = state => ({
  parameters: state.parameters.params,
  selectedParams: state.parameters.selected,
  fab: 'M14',
  mod: 'MODULE_1',
  from: '2018-08-01',
  to: '2018-08-02',
  lot: 'LOT_1',
});

const mapDispatchToProps = dispatch => ({
  onClickParam: param => dispatch(setSelected({ selected: [param] })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
