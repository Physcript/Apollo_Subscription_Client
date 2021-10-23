
import { useState,useEffect } from 'react'
import { Grid,Button,Loader,Image } from 'semantic-ui-react'

import { useMutation,useQuery } from '@apollo/client'
import { GET_PERSON_POST_QUERY } from '../graphql/query/postQuery'

import moment from 'moment'


const ViewPost = ({user}) => {

	const [ person,setPerson ] = useState({})
	const [ index,setIndex ] = useState(5)
	const [ post, setPost ] = useState({})


	const { data: personData, loading: personLoading, error: personError } = useQuery(GET_PERSON_POST_QUERY,{
		variables: {
			profileId: person.profileId,
			index
		},		
		onCompleted: (val) => {
			setPost(val.personPost)

		}
	})

	useEffect( () => {
		if(user) setPerson(user)
	},[user])

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width = { 10 } className = 'centered grid'>
					
				{ post.post?.map( (val) => (
					<div key = { val._id} style = {{ background: '#ffffff', padding: '20px' , margin: '20px'  }} >
						<div style = {{ display: 'flex' , justifyContent: 'space-between', alignItems: 'center'  }} >
							<div  style = {{ display: 'flex' ,  alignItems: 'center', padding: '10px 10px' }}>
								<Image src = { person.image } circular size = 'mini' style = {{ margin: '0 10px', width: '25px' , height: '25px'}}  />
								<label>{val.name}</label> <label> </label>
							</div>
							<label>{ moment(val.createdAt).fromNow() }</label>
						</div>

						<div >
							{ val.body }
						</div>
						<div>
							<Image src = { val.image } style = {{ maxHeight: '200px' }} centered/>
						</div>
					</div>
				))}


				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default ViewPost