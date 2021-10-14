
import { useState,useEffect } from 'react'

import { Container,Grid,Image } from 'semantic-ui-react'

import HomeProfile from '../components/HomeProfile'
import HomeProfileMobile from '../components/HomeProfileMobile'

import { withRouter } from 'react-router-dom'


import { useQuery } from '@apollo/client'
import { AUTHENTICATE_USER_TOKEN_QUERY } from '../graphql/query/userQuery'
import Cookies from 'js-cookie'

import 'semantic-ui-css/semantic.min.css'
import './home.css'

const Home = ({user}) => {

	const [person,setPerson] = useState({})

	const { data,loading,error } = useQuery(AUTHENTICATE_USER_TOKEN_QUERY,{
    	variables: {
    	  	token: Cookies.get('token')
   	 	}
   	})

    useEffect(()=>{

    	if(data) setPerson(data.authLogin)

    },[data])

	return(
		<div>
			<Container>
				<Grid >
					<Grid.Row>
						<Grid.Column computer = { 4 } table = { 16 } mobile = { 16 }>
							<HomeProfile user = { person }/>
						</Grid.Column>
						<Grid.Column computer = { 11 } mobile = { 16 }	 floated = {'right'} >
							
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</div>
	)
}

export default withRouter(Home)