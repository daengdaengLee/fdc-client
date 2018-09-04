import { connect } from 'react-redux';
import { setSelected } from '../../../ducks/modules/parameters';
import Presenter from './presenter';

const mapStateToProps = state => ({
  parameters: state.parameters.params,
  selectedParams: state.parameters.selected,
});

const mapDispatchToProps = dispatch => ({
  onClickParam: param => dispatch(setSelected({ selected: [param] })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
