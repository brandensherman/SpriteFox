import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import Routes from './components/Routes'

ReactDOM.render(
  <Routes />
  ,
  document.getElementById('app')
)
