

import { useQuery } from '@apollo/client'
import { AUTHENTICATE_USER_TOKEN_QUERY } from './graphql/query/userQuery'
import Cookies from 'js-cookie'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// pages
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import ForgotPage from './pages/ForgotPage'
import ChangePage from './pages/ChangePage'
import ViewPage from './pages/ViewPage'

import ProtectedRoute from './components/ProtectedRoute'

import { Container } from 'semantic-ui-react'



import {useEffect,useState} from 'react'
import './App.css'

  const App = () => {

  // const [auth,setAuth] = useState(false)
  // const { data,loading,error } = useQuery(AUTHENTICATE_USER_TOKEN_QUERY, {
  //   variables:{
  //     token: Cookies.get('token')
  //   }
  // })

  // useEffect(() => {
  //   if(data) setAuth(true)
  // },[data])



  return (
    <Router>
      <Switch>
        <Route exact path = '/' component = {LandingPage}> <LandingPage /> </Route>
        <Route exact path = '/register' component = { RegisterPage }> <RegisterPage /> </Route>
        <Route exact path = '/forgotpassword' component = { ForgotPage }> <ForgotPage /> </Route>
        <Route exact path = '/forgotpassword/u/:forgottoken' component = { ChangePage }> <ChangePage /> </Route>


        <Route exact path = '/user/:profileId' component = { ViewPage } > <ViewPage /> </Route>  
        <ProtectedRoute exact path = '/home' component = { Home } />  
      </Switch>
    </Router> 
  )
}

export default App