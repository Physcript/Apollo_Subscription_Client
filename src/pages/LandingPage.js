
import { Container, Grid, Button, Header, Icon, Form, Label } from 'semantic-ui-react'

// component
import Login from '../components/Login'


import 'semantic-ui-css/semantic.min.css';
import './landing-page.css'

function LandingPage ()  {
	return (

		<div>
			<Container>
				<Grid>
					<Grid.Row>
					
							<Grid.Column computer = { 8 } only = 'computer' >
								<div className = 'landing-page-left'>
									<h1>WELCOME</h1>
									<p style = {{ textAlign: 'justify', textIndent: '1em' }}>    Lorem Ipsum is simply dummy text of the printing and 
									typesetting industry. Lorem Ipsum has been the industry's 
									standard dummy text ever since the 1500s, when an unknown 
									printer took a galley of type and scrambled it to make a type 
									specimen book. It has survived not only five centuries, but also 
									the leap into electronic typesetting, remaining essentially unchanged.
									It was popularised in the 1960s with the release of Letraset sheets 
									containing Lorem Ipsum passages, and more recently with desktop 
									publishing software like Aldus PageMaker including versions of Lorem 
									Ipsum </p>
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