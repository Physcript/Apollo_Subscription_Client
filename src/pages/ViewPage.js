import { useEffect,useState } from 'react'

import { useQuery }  from '@apollo/client'
import {GET_USER_BY_PROFILE_ID_QUERY} from '../graphql/query/userQuery'

import ViewProfile from '../components/ViewProfile'
import PostComponent from '../components/PostComponent'
import SearchComponent from '../components/SearchComponent'
import ViewPost from '../components/ViewPost'

import { withRouter,useParams } from 'react-router-dom'
import { Grid,Container,Loader,Segment,Dimmer,Input } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

const ViewPage = () => {

	const [ person,setPerson ] = useState({})
	const { profileId } = useParams()
	const { data,loading,error } = useQuery(GET_USER_BY_PROFILE_ID_QUERY,{
		variables: {
			profileId
		},
		onCompleted: (val) => {
			console.log(val)
			setPerson(val.viewUser)
		}
	})

	return (

		<div style = {{ background: '#f0f2f5' }} >

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
						<Grid.Column computer = { 4 } tablet = { 8 } mobile = { 8 } className = 'column centered' >
							<ViewProfile user = { person } />
						</Grid.Column>
						<Grid.Column computer = { 11 } tablet = { 16 } mobile = { 16 }	 floated = {'right'} className = 'column centered' >
							<SearchComponent />
							<PostComponent prof = { profileId } />
							<ViewPost user = { person } />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</div>
	)
}

export default withRouter(ViewPage)