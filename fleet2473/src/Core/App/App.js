import React, { Suspense, useEffect, useState } from 'react';
// import { getLazyComponent } from '../Basic/Menu';
// import PageLevelComponents from './PageLevel/PageLevelComponents';
// import AppNavbar from '../AppNavbar/AppNavbar'
import { AppContextProvider } from './PageLevel/AppContextProvider';
import './App.scss'
import { RouterAndView } from './RouterAndView';
import PageLevelComponents from './PageLevel/PageLevelComponents';

function App() {
  return (
    <AppContextProvider>
      <RouterAndView />
      {/* <AppNavbar></AppNavbar>
      <div className="container">
        <div className="app">
          <Suspense fallback={<div>Loading...</div>}>
            <Comp></Comp>
          </Suspense>
        </div>
      </div>*/}
      <PageLevelComponents></PageLevelComponents>
    </AppContextProvider>
  );
}

export default App;
