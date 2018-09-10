import { connect } from 'react-redux';
import Presenter from './presenter';

const mapStateToProps = state => {
  const {
    histories: { isLoading: historiesLoading },
    trees: { isLoading: treesLoading },
    parameters: { isLoading: parametersLoading },
    charts: { isLoading: chartsLoading },
  } = state;
  const isLoading =
    historiesLoading || treesLoading || parametersLoading || chartsLoading;
  return {
    isLoading,
  };
};

export default connect(mapStateToProps)(Presenter);
