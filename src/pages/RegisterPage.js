import { Link } from 'react-router-dom'

import { Container, Grid, Button, Header, Icon, Form, Label,Image} from 'semantic-ui-react'

import myImage from '../images/Landing.png'

// components
import Register from '../components/Register'

import 'semantic-ui-css/semantic.min.css';
import './register.css'

const RegisterPage = () => {
	return (
		<div className = 'register' style = {{ background: `url(${myImage})`}}>
			<Container>
				<Grid>
					<Grid.Row style = {{ height: '100vh' }}>
						<Grid.Column computer = { 6 } mobile = { 16 } >
							<div className = 'drop'>
								<label><Icon name = 'arrow left'/><Link to = '/'>Back</Link></label>
							</div>
							<Register />
						</Grid.Column>
						<Grid.Column computer = { 10 } only = 'computer'>
							<div className = 'display-center'>
								<Image src = "https://res.cloudinary.com/dnnq8kne2/image/upload/v1633601034/System/Work_06_fyprhs.png"/>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</div>
	)
}

export default RegisterPage