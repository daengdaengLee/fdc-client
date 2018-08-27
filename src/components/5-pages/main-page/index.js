import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainTemplate from '../../4-templates/main-template';
import MainNavigation from '../../3-organisms/main-navigation';
import MainTable from '../../3-organisms/main-table';
import MainChart from '../../3-organisms/main-chart';

const MainPage = () => (
  <MainTemplate
    left={() => <MainNavigation />}
    center={() => (
      <Switch>
        <Route exect path="/tables" component={MainTable} />
        <Route exect path="/charts" component={MainChart} />
      </Switch>
    )}
  />
);

export default MainPage;
