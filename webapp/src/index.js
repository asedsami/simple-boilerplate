import '@babel/polyfill'
// import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App.jsx'

ReactDOM.render(<App />, document.getElementById('root'))