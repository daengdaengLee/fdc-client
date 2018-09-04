import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainTemplate from '../../4-templates/main-template';
import MainNavigation from '../../3-organisms/main-navigation';
import MainHeader from '../../3-organisms/main-header';
import MainHistoriesTable from '../../3-organisms/main-histories-table';
import MainChart from '../../3-organisms/main-chart';
import MainContextMenu from '../../3-organisms/main-context-menu';

const MainPage = () => (
  <MainTemplate
    top={() => <MainHeader />}
    left={() => <MainNavigation />}
    center={() => (
      <Switch>
        <Route exect path="/histories" component={MainHistoriesTable} />
        <Route exect path="/charts" component={MainChart} />
      </Switch>
    )}
    aerial={() => <MainContextMenu />}
  />
);

export default MainPage;
