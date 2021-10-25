
import Cookies from 'js-cookie'
import SearchComponent from '../components/SearchComponent'

import { 
	UPLODATE_IMAGE_MUTATION,
	UPLOAD_IMAGE_DELETE_MUTATION,
	UPDATE_USER_PROFFILE_MUTATION
	 } from '../graphql/mutation/userMutation'

import {
	AUTHENTICATE_USER_TOKEN_QUERY 
} from '../graphql/query/userQuery'

import { useMutation } from '@apollo/client'

import { useState,useEffect } from 'react'
import { Dropdown,Container,Grid,Image,Modal,Segment,Icon,Input,Button,Header,Message, Loader,Dimmer,Form } from 'semantic-ui-react'
import { withRouter,useHistory,Link } from 'react-router-dom'


// components
import Notification from './Notification'

import 'semantic-ui-css/semantic.min.css'

const HomeProfile = ({user}) => {


	const [ mobileNotif, setMobileNotif ] = useState({
		isTrue : window.innerWidth >= 974 ? false : true
	})
	const [ computerNotif, setComputerNotif ] = useState({
		isTrue : window.innerWidth >= 974 ? true : false
	})

	// modal
	const [open, setOpen] = useState(false)
	const openModal = () => {
		setOpen(true)
		setUploadSyntax({})
		setUpdatePerson(user)
	}

	const closeModal = () => {

		if(u_loading) return 

		setOpen(false)

		if(profileImage.public_id == null) return

		deleteUploadImage({
			variables:{ 
				publicId: profileImage.public_id
			}
		})

	}
 
	// mutation
	const [uploadImage, { data:u_data,loading:u_loading,error:u_error }] = useMutation(UPLODATE_IMAGE_MUTATION,{
		onError(val) {
			setUploadSyntax(val.graphQLErrors[0].extensions.error)
		}
	})

	const [deleteUploadImage, { data:d_u_data,loading:d_u_loading,error:d_u_error }] = useMutation(UPLOAD_IMAGE_DELETE_MUTATION)
	const [updateUser , { data: u_u_data,loading:u_u_loading,error:u_u_error } ] = useMutation(UPDATE_USER_PROFFILE_MUTATION, {

		refetchQueries: [
			AUTHENTICATE_USER_TOKEN_QUERY,
			'authLogin'
		]
		,
		onError(error){
			console.log(error.graphQLErrors[0].extensions.code)
			history.push('/')

		}
	})

	// users
	const [person,setPerson] = useState(user)
	const [updatePerson,setUpdatePerson] = useState(user)

	// misc 
	const history = useHistory()
	let [uploadSyntax,setUploadSyntax] = useState({})
	const [profileImage,setProfileImage] = useState({})
	// handlers

	const onChangeUpdate = (e) => {
		e.preventDefault()
		const { name,value } = e.target 

		setUpdatePerson( (val) => ({
			...val,
			[name]:value
		}) )
 	}


	const fileHandler = (e) => {
		e.preventDefault()
		if(u_loading) return 
		uploadImage({
			variables: {
				image: e.target.files[0]
			}
		})
	}

	const updateHandler = (e) => {
		e.preventDefault()
		setOpen(false)
		updateUser({
			variables: {
				firstName: updatePerson.firstName,
				lastName: updatePerson.lastName,
				image: profileImage.url
			}
		})

	}

	const logoutHandler = (e) => {
		e.preventDefault()
		Cookies.remove('token')
		history.push('/')
	}


	useEffect(()=> {

		u_data ? updateState() : console.log('clean')
		u_u_data ? updateUser() : console.log('clean')
		user ? userState() : console.log('clean')

		function updateState(){

			setProfileImage(u_data.uploadImage)
			setUploadSyntax({})

		}

		function updateUser(){
			console.log(u_u_data)
		}

		function userState() {
			setPerson(user)
		}


	},[u_data, u_u_data,user])

	return (
		<Grid >
			<Grid.Row>

					<Grid.Column only = 'tablet mobile' width = { 16 }>
					<div style = {{ display: 'flex',justifyContent: 'space-between', marginTop: '20px' }}>
						<div>
							<SearchComponent />
						</div>
						<div style = {{ display: 'flex', gap: '10px', alignItems: 'center' }}>
							<Image  style = {{ objectFit: 'cover', maxWidth: '35px', maxHeight: '35px' }} src = { person.image } circular size = 'tiny'/>
							<Notification logout = {false} action = { mobileNotif.isTrue }clasName = 'computer mobile' />
							<label>{person.lastName} {person.firstName}</label>
							<Dropdown
								className = 'icon'
								icon = "bars"

							>
								<Dropdown.Menu className = 'left menu'>
									<Dropdown.Item text = 'Update Profile' onClick = { openModal } />
									<Dropdown.Item text = 'Logout' onClick = { logoutHandler } />
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</Grid.Column>
				<Grid.Column only = 'computer' width = { 16 } style = {{ height: '100vh',display: 'flex',flexDirection: 'column', justifyContent:'center', gap: '20px' }}>
						<div style = {{ textAlign: 'right', paddingRight: '20px' }}>
							<Notification action = { computerNotif.isTrue }/>
						</div>
					<div style = {{ textAlign: 'center' }}  >
						<Image centered style = {{ objectFit: 'cover', width: '100px', height: '100px' }} src = { person.image } circular size = 'tiny'/>
						<label> <Link to = {{ 
							pathname: `/user/${person.profileId}`,
							state: { auth: true } 
							}}> 
							{person.lastName} {person.firstName}</Link> </label>
					</div>

					<div className = 'flex-gap'>
						<label onClick = { openModal }>Update Profile</label>
						<a href = '/home'><label>Friend</label></a>
						<a href = '/home'><label>Notification</label></a>
					</div>

					<div className = 'home-recent-activity'>
						<label>Recent Activity</label>
					</div>
				
				</Grid.Column>
			</Grid.Row>


			<Modal
		      onClose={ closeModal }
		      onOpen={() => setOpen(true)}
		      open={open}
		    >
		      <Modal.Header>Update Profile</Modal.Header>
		      <Modal.Content image>

		      	<div style = {{ padding: '10px' }}>

		      		{ uploadSyntax.title ? (
		      		<Message warning>
		      			<label>{ uploadSyntax.title }</label>
		        	</Message>
		        	) : '' }
		        	
		        	{ u_loading ? (
		        		<Segment>
							<Image size='medium' src = {  u_data ? u_data.uploadImage.url : person.image } wrapped />
			        		<Dimmer active>
						    	<Loader size='medium'>Loading</Loader>
						    </Dimmer>
					    </Segment>
		        	) : (
		        	<Image size='medium' src = {  profileImage.url ? profileImage.url : person.image } wrapped  />
		        	) }
		        	<Input 
		        		type = 'file' 
		        		fluid 
		        		accept= "image/*" 
		        		onChange = { fileHandler }
		        		disabled = { u_loading ? true : false  }
		        	/>
		        </div>


		        <Modal.Description style = {{ padding: '20px' , alignSelf: '' }}>
		        	<h1>Information</h1>
		        	<Form.Group style = {{ display: 'flex',flexDirection: 'column' }}>
				        <label>Firstname</label>
				        <Input 
				        	name = 'firstName'
				        	value = { updatePerson.firstName }
				        	onChange = { onChangeUpdate }
				        />
			        </Form.Group>
			        <Form.Group style = {{ display: 'flex',flexDirection: 'column' }} >
				        <label>Lastname</label>
				        <Input 
				        	name = 'lastName'
				        	value = { updatePerson.lastName }
				        	onChange = { onChangeUpdate }
				        />
			        </Form.Group>
			      

		        </Modal.Description>
		      </Modal.Content>
		      <Modal.Actions>
		        <Button color='black' onClick={ closeModal }>
		          Cancel
		        </Button>
		        <Button
		          content="UPDATE"
		          labelPosition='right'
		          icon='checkmark'
		          onClick={ updateHandler }
		          positive
		        />
		      </Modal.Actions>
		    </Modal>


		</Grid>
	)
}

export default withRouter(HomeProfile)