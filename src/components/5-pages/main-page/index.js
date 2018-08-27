import React from 'react';
import MainTemplate from '../../4-templates/main-template';
import MainNavigation from '../../3-organisms/main-navigation';

const MainPage = () => <MainTemplate left={() => <MainNavigation />} />;

export default MainPage;
