
import { useState,useEffect } from 'react'

import { Container,Grid,Image } from 'semantic-ui-react'

import HomeProfile from '../components/HomeProfile'
import HomeProfileMobile from '../components/HomeProfileMobile'
import Notification from '../components/Notification'
import SearchComponent from '../components/SearchComponent'
import PostComponent from '../components/PostComponent'
import SinglePostCompoenentV2 from '../components/SinglePostCompoenentV2'

import { withRouter } from 'react-router-dom'


import { useQuery } from '@apollo/client'
import { AUTHENTICATE_USER_TOKEN_QUERY } from '../graphql/query/userQuery'
import { GET_POST_QUERY } from '../graphql/query/postQuery'

import Cookies from 'js-cookie'

import 'semantic-ui-css/semantic.min.css'
import './home.css'

const Home = ({user}) => {

	const [person,setPerson] = useState({})
	const [index,setIndex] = useState(5)
	const [ post,setPost ] = useState({})

	const { data,loading,error } = useQuery(AUTHENTICATE_USER_TOKEN_QUERY,{
    	variables: {
    	  	token: Cookies.get('token')
   	 	}
   	})


   	const { data: postQueryData,loading: postQueryLoading, error: postQueryError } = useQuery(GET_POST_QUERY,{
   		variables: {
   			index
   		},
   		pollInterval: 500,
   		onCompleted: (val) => {
   			console.log(val)
   			setPost(postQueryData.getPost)
   		}		
   	})



	const pag = () => {

		console.log(pag)
		setIndex( index + 3 )

	}


   	window.onscroll = (e) => {
		if((document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight - 50)  <= 0) {
			pag()
		}

	}
		



    useEffect(()=>{

    	if(data) setPerson(data.authLogin)
    	if(postQueryData) setPost(postQueryData.getPost)
    },[data,postQueryData])

	return(
		<div style = {{ background: '#f0f2f5' }}>
			<Container>
				<Grid >
					<Grid.Row>
						<Grid.Column computer = { 4 } table = { 16 } mobile = { 16 }>
							<HomeProfile user = { person }/>
						</Grid.Column>
						<Grid.Column only = 'computer' computer = { 11 } floated = {'right' } style = {{ paddingTop: '30px' }} >
							<SearchComponent />
							<Grid.Column computer = { 11 } mobile = { 16 }	 floated = {'right'} style = {{ paddingTop: '30px' }} >
								<PostComponent />
								<div>
									{ post.post?.map( (val) => (

										<SinglePostCompoenentV2  key = { val._id} postData = { val } index = { setIndex }/>

									))}
								</div>
							</Grid.Column>
						</Grid.Column>
						<Grid.Column only = 'mobile tablet' mobile = { 16 } tablet = {16}	 floated = {'right'} style = {{ paddingTop: '30px' }} >
								<PostComponent />
								<div>
									{ post.post?.map( (val) => (

										<SinglePostCompoenentV2  key = { val._id} postData = { val } index = { setIndex }/>

									))}
								</div>
							</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</div>
	)
}

export default withRouter(Home)