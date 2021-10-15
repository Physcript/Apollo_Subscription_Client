import { useEffect,useState } from 'react'

import { useQuery }  from '@apollo/client'
import {GET_USER_BY_PROFILE_ID_QUERY} from '../graphql/query/userQuery'


import { withRouter,useParams } from 'react-router-dom'
import { Grid,Container,Loader,Segment,Dimmer } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

const ViewPage = () => {

	const { profileId } = useParams()
	const { data,loading,error } = useQuery(GET_USER_BY_PROFILE_ID_QUERY,{
		variables: {
			profileId
		}
	})


	return (

		<div>

		{ loading ? ( 
			<div>
				<Segment style = {{ height: '100vh' , width: '100%' }}>
					<Dimmer active>
						<Loader active inline = 'centerd' />
					</Dimmer>	
				</Segment>
			</div>
		)
		: '' }
			<Container>
				<Grid >
					<Grid.Row>
						<Grid.Column computer = { 4 } table = { 16 } mobile = { 16 }>
							
						</Grid.Column>
						<Grid.Column computer = { 11 } mobile = { 16 }	 floated = {'right'} >
							
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</div>
	)
}

export default withRouter(ViewPage)