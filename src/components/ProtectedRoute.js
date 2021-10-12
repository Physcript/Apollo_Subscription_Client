
import Cookies from 'js-cookie'

import { useEffect,useState } from 'react'
import { Route,Redirect,useLocation  } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { AUTHENTICATE_USER_TOKEN_QUERY } from '../graphql/query/userQuery'


const ProtectedRoute = ({ component: Component, ...rest }) => {
	const location = useLocation();

	
	return(
		<Route { ...rest }  render = { (props) => {

			if(location.state){	
				if(location.state.auth) return <Component user = { location.state.user } />
			 	
			}else {
				return <Redirect to = {{ pathname: '/', state: { from: props.location } }}  />
			}
			

		}}/>
	)
}


export default ProtectedRoute