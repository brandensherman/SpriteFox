import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Canvas from './Canvas'
import Palette from './Palette'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {

  }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <Router>
        <div>
          <div className="main-container">
            <div>
              <Palette />
            </div>
            <div>
              <Canvas />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default Routes
