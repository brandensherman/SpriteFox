import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Canvas from './Canvas';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Canvas} />
      </Router>
    );
  }
}

export default Routes;
