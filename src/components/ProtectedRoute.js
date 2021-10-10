
import { useEffect,useState } from 'react'
import { Route,Redirect } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { AUTHENTICATE_USER_TOKEN_QUERY } from '../graphql/query/userQuery'


const ProtectedRoute = ({component: Component, ...rest }) => {

	const [ auth,setAuth ] = useState(false)

	const { data,loading,error } = useQuery(AUTHENTICATE_USER_TOKEN_QUERY)

	// query

	useEffect( () => {

	},[])

	return(
		<Route { ...rest } render = { (props) => {

			if(auth){
				return <Component />
			}else{
				return <Redirect to = {{ pathname: '/', state: { from: props.location } }}  />
			}

		}}/>
	)
}


export default ProtectedRoute