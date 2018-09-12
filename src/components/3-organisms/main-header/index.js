import { connect } from 'react-redux';
import { push } from '../../../ducks/modules/routes';
import Presenter from './presenter';

const mapStateToProps = state => ({
  location: state.routes.location,
});

const mapDispatchToProps = dispatch => ({
  onClickHistory: () => dispatch(push({ location: 'histories' })),
  onClickTrace: () => dispatch(push({ location: 'charts' })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
