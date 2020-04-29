import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import 'normalize.css';
import './app.scss';
import '../component/app-bar.js'

import Header from '../component/header';
import CounterPage from './counterPage';
import RankPage from './rankPage';
import ChartPage from './chartPage';
import AboutPage from './aboutPage';
import NotFoundPage from './notFoundPage';
import NavBar from '../component/navBar';

const App = () => {
  return (
    <Router>
      <div className="container">
        {/* <AppBar /> */}
        <Header />

        <Switch>
          <Route exact path="/">
            <CounterPage />
          </Route>

          <Route path="/rank">
            <RankPage />
          </Route>

          <Route path="/chart">
            <ChartPage />
          </Route>

          <Route path="/about">
            <AboutPage />
          </Route>

          <Route exact path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
