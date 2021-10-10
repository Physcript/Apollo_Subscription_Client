
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// pages
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import ForgotPage from './pages/ForgotPage'
import ChangePage from './pages/ChangePage'
import ProtectedRoute from './components/ProtectedRoute'

import { Container } from 'semantic-ui-react'

import './App.css'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path = '/' component = {LandingPage}> <LandingPage /> </Route>
        <Route exact path = '/register' component = { RegisterPage }> <RegisterPage /> </Route>
        <Route exact path = '/forgotpassword' component = { ForgotPage }> <ForgotPage /> </Route>
        <Route exact path = '/forgotpassword/u/:forgottoken' component = { ChangePage }> <ChangePage /> </Route>

        <ProtectedRoute exact path = '/home' component = { Home } />  
      </Switch>
    </Router> 
  )
}

export default App