import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage';
import MainPage from './MainPage';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/MainPage' component={MainPage} />
      </Router>
    );
  }
}

export default Routes;
