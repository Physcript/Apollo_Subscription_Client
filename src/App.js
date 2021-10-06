
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// pages
import LandingPage from './pages/LandingPage'

import { Container } from 'semantic-ui-react'

import './App.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path = '/' component = {LandingPage}> <LandingPage /> </Route>
      </Switch>
    </Router>
  )
}

export default App