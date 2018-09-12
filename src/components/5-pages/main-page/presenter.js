import React, { Fragment } from 'react';
import MainTemplate from '../../4-templates/main-template';
import MainNavigation from '../../3-organisms/main-navigation';
import MainHeader from '../../3-organisms/main-header';
import MainHistoriesTable from '../../3-organisms/main-histories-table';
import MainChart from '../../3-organisms/main-chart';
import MainContextMenu from '../../3-organisms/main-context-menu';
import MainSpinner from '../../3-organisms/main-spinner';

const MainPage = ({ location }) => (
  <MainTemplate
    top={() => <MainHeader />}
    left={() => <MainNavigation />}
    center={() => (
      <Fragment>
        <MainHistoriesTable />
        <MainChart />
      </Fragment>
    )}
    aerial={() => (
      <Fragment>
        <MainContextMenu />
        <MainSpinner />
      </Fragment>
    )}
  />
);

export default MainPage;
