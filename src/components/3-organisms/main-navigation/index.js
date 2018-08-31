import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  requestFetch,
} from '../../../ducks/modules/trees';
// import {  } from '../../../ducks/sagas/trees';
import Presenter from './presenter';

const mapStateToProps = state => ({
  nodes: state.trees.nodes,
});

const mapDispatchToProps = dispatch => ({
  onRequestFetch: bindActionCreators(requestFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);