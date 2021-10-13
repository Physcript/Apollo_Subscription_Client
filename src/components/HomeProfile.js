


import { useState,useEffect } from 'react'
import { Container,Grid,Image,Modal,Segment,Icon,Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

const HomeProfile = ({user}) => {

	const [person,setPerson] = useState(user)

	return (
		<Grid >
			<Grid.Row>
				<Grid.Column only = 'computer' width = { 16 } style = {{ height: '100vh',display: 'flex',flexDirection: 'column', justifyContent:'center', gap: '20px' }}>
		
					<div style = {{ textAlign: 'center' }}  >
						<Image centered style = {{ objectFit: 'cover', maxWidth: '150px', maxHeight: '150px' }} src = { person.image } circular size = 'tiny'/>
						<label>{person.lastName} {person.firstName}</label>
					</div>

					<div className = 'flex-gap'>
						<a href = '/home'><label>Update Profile</label></a>
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
		</Grid>
	)
}

export default withRouter(HomeProfile)