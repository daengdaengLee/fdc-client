import { connect } from 'react-redux';
import { paginateStart, initTable } from '../../../ducks/modules/tables';
import Presenter from './presenter';

const mapStateToProps = state => ({
  rows: state.tables.rows,
});

const mapDispatchToProps = dispatch => ({
  onInit: () => dispatch(initTable()),
  onPaginate: page => dispatch(paginateStart(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Presenter);
