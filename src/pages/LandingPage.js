
import { Container, Grid, Button, Header, Icon, Form, Label,Image } from 'semantic-ui-react'

// component
import Login from '../components/Login'


import 'semantic-ui-css/semantic.min.css';
import './landing-page.css'

function LandingPage ()  {
	return (

		<div className = 'landing-page-left' >
			<Container>
				<Grid>
					<Grid.Row>
							<Grid.Column computer = { 8 } only = 'computer' >
								<div className = ''>
									<Image src = 'https://res.cloudinary.com/dnnq8kne2/image/upload/v1633773903/System/dog_r8yaeu.png' />
								</div>
							</Grid.Column>

							<Grid.Column computer = { 8 } table = { 8 } mobile = { 8 } className = 'centered column' >
								<Login />
							</Grid.Column>
				
					</Grid.Row>
				</Grid>		
			</Container>
			
		</div>

	)
}

export default LandingPage