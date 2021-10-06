
import { Container, Grid, Button, Header, Icon, Form, Label } from 'semantic-ui-react'


const Login = () => {
	return(
		<div className = 'landing-page-right'>
			<h1>LOGIN</h1>
			<Form.Field>
				<label>Email</label>
				<Form.Input 
					placeholder = 'John@yahoo.com'
					fluid
				/>
			</Form.Field>
			<Form.Field>
				<label>Password</label>
				<Form.Input 
					placeholder = '*********'
					fluid
				/>
				</Form.Field>
				<label>Forgot password</label>
				<label>Register here</label>
				<Form.Field>
					<Button primary style = {{ width: '50%'}}>Login</Button>
				</Form.Field>
		</div>
	)	
}

export default Login