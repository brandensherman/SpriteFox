import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Canvas from './Canvas';
import Home from './Home';
import CreateArtboard from './CreateArtboard';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/canvas' component={Canvas} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/create' component={CreateArtboard} />
      </Router>
    );
  }
}

export default Routes;
