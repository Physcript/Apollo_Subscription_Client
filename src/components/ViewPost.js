
import { useState,useEffect } from 'react'
import { Grid,Button,Loader,Image } from 'semantic-ui-react'

import { useMutation,useQuery } from '@apollo/client'
import { GET_PERSON_POST_QUERY } from '../graphql/query/postQuery'

import SinglePostComponent from './SinglePostComponent'

import moment from 'moment'


const ViewPost = ({user}) => {

	const [ person,setPerson ] = useState({})
	const [ index,setIndex ] = useState(5)
	const [ post, setPost ] = useState({})
	const [ see,setSee ] = useState({
		default: 200
	})


	const pag = () => {

		setIndex( index + 5  )
		refetch()

	}


	const { data: personData, loading: personLoading, error: personError, refetch } = useQuery(GET_PERSON_POST_QUERY,{
		variables: {
			profileId: person.profileId,
			index
		},		
		onCompleted: (val) => {
			window.onscroll = () => {
			
			if( document.documentElement.scrollHeight - document.documentElement.scrollTop === window.innerHeight ) {
				pag()
			}
			}
		}
	})


	useEffect( () => {
		if(user) setPerson(user)
		if(personData) setPost(personData.personPost)
	},[user,personData])

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column computer = { 10 } tablet = { 16 }className = 'centered grid'>
					
				{ post.post?.map( (val) => {
				
					return (
						<SinglePostComponent data = {val} persons = {person} />
					)

				})

				}

				{ post.count == post.post?.length ? ( 
					<div style = {{ background: '#ffffff', padding: '20px' , margin: '20px'  }} >
						<label> no more </label>
					</div>
				) : '' }

				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default ViewPost