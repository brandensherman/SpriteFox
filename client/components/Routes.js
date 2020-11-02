import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Canvas from './Canvas';
import HooksCanvas from './HooksCanvas';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={LandingPage} />
        {/* <Route exact path='/:hash' component={Canvas} /> */}
        <Route exact path='/hooks' component={HooksCanvas} />
      </Router>
    );
  }
}

export default Routes;
