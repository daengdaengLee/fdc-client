import { connect } from 'react-redux';
import Presenter from './presenter';

const mapStateToProps = state => ({
  location: state.routes.location,
});

export default connect(mapStateToProps)(Presenter);
