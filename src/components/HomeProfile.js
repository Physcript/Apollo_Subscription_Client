
import { UPLODATE_IMAGE_MUTATION } from '../graphql/mutation/userMutation'
import { useMutation } from '@apollo/client'

import { useState,useEffect } from 'react'
import { Container,Grid,Image,Modal,Segment,Icon,Input,Button,Header, } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

const HomeProfile = ({user}) => {

	// modal
	const [open, setOpen] = useState(false)

	// mutation
	const [uploadImage, { data:u_data,loading:u_loading,error:u_error }] = useMutation(UPLODATE_IMAGE_MUTATION,{
		onError(val) {
			console.log('val.e ',val.graphQLErrors[0])
			console.log('val.only',val)
		}
	})

	// users
	const [person,setPerson] = useState(user)

	// misc 
	const [profileImage,setProfileImage] = useState({})

	// handlers
	const fileHandler = (e) => {
		e.preventDefault()
		uploadImage({
			variables: {
				image: e.target.files[0]
			}
		})
	}

	useEffect(()=> {
		u_data ? console.log(u_data) : console.log('')
	},[u_data])

	return (
		<Grid >
			<Grid.Row>
				<Grid.Column only = 'computer' width = { 16 } style = {{ height: '100vh',display: 'flex',flexDirection: 'column', justifyContent:'center', gap: '20px' }}>
		
					<div style = {{ textAlign: 'center' }}  >
						<Image centered style = {{ objectFit: 'cover', maxWidth: '150px', maxHeight: '150px' }} src = { person.image } circular size = 'tiny'/>
						<label>{person.lastName} {person.firstName}</label>
					</div>

					<div className = 'flex-gap'>
						<label onClick = { () => setOpen(true) }>Update Profile</label>
						<a href = '/home'><label>Message</label></a>
						<a href = '/home'><label>Friend</label></a>
						<a href = '/home'><label>Notification</label></a>
						<a href = '/home'><label>Logout</label></a>
					</div>

					<div className = 'home-recent-activity'>
						<label>Recent Activity</label>
					</div>
				
				</Grid.Column>
				<Grid.Column only = 'tablet mobile' width = { 16 }>
					<div style = {{ display: 'flex',justifyContent: 'space-between', marginTop: '20px' }}>
						<div>
							<Input size = 'mini'
								placeholder = 'Search by Email'
								style = {{ width: '200px' }}
							/>
						</div>
						<div style = {{ display: 'flex', gap: '20px', alignItems: 'center' }}>
							<Image  style = {{ objectFit: 'cover', maxWidth: '35px', maxHeight: '35px' }} src = { person.image } circular size = 'tiny'/>
							<label>{person.lastName} {person.firstName}</label>
							<Icon name = 'bars' size = 'big' />
						</div>

					</div>
				</Grid.Column>
			</Grid.Row>


			<Modal
		      onClose={() => setOpen(false)}
		      onOpen={() => setOpen(true)}
		      open={open}
		    >
		      <Modal.Header>Update Profile</Modal.Header>
		      <Modal.Content image>
		      	<div>
		        	<Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
		        	<Input 
		        		type = 'file' 
		        		fluid 
		        		accept= "image/*" 
		        		onChange = { fileHandler }
		        	/>
		        </div>
		        <Modal.Description>
		          <Header>Default Profile Image</Header>
		          <p>
		            We've found the following gravatar image associated with your e-mail
		            address.
		          </p>
		          <p>Is it okay to use this photo?</p>
		        </Modal.Description>
		      </Modal.Content>
		      <Modal.Actions>
		        <Button color='black' onClick={() => setOpen(false)}>
		          Nope
		        </Button>
		        <Button
		          content="Yep, that's me"
		          labelPosition='right'
		          icon='checkmark'
		          onClick={() => setOpen(false)}
		          positive
		        />
		      </Modal.Actions>
		    </Modal>


		</Grid>
	)
}

export default withRouter(HomeProfile)