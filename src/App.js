
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// pages
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'

import { Container } from 'semantic-ui-react'

import './App.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path = '/' component = {LandingPage}> <LandingPage /> </Route>
        <Route exact path = '/home' component = { Home }> <Home /> </Route>
        <Route exact path = '/register' component = { RegisterPage }> <RegisterPage /> </Route>
      </Switch>
    </Router>
  )
}

export default App