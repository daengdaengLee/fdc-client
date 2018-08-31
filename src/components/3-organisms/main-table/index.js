import { connect } from 'react-redux';
import Presenter from './presenter';

const mapStateToProps = state => ({
  rows: state.histories.rows,
  columns: state.histories.columns,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
