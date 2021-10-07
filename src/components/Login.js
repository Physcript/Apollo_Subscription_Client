import { useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Container, Grid, Button, Header, Icon, Form, Label, Loader,Message } from 'semantic-ui-react'

// graphql apollo

import { useMutation } from '@apollo/client'
import { LOGIN_USER_MUTATION } from '../graphql/mutation/userMutation'

const Login = () => {

	// mutation

	const [ loginSyntax, setLoginSyntax ] = useState({})
	const [ login, { data: loginData, loading: loginLoading, error: loginError } ] = useMutation(LOGIN_USER_MUTATION, {
		onError(e) {
			setLoginSyntax(e.graphQLErrors[0].extensions.error)
		},
		onCompleted: e => {
			setLoginSyntax({})
			localStorage.setItem('token',e.loginUser )
			history.push('/home')
		}
	})


	// 
	const history = useHistory()

	const [ loginState,setLoginState ] = useState({
		email: '',
		password: '',
	})

	const onChange = (e) => {
		e.preventDefault()
		const { name,value } = e.target
		setLoginState( (e) => ({ ...e, [name]:value }) )
	}

	const loginHandler = (e) => {
		e.preventDefault()

		if(loginLoading) return

		login({
			variables: {
				email: loginState.email,
				password: loginState.password
			}
		})

	}

	useEffect(()=> {


	},[loginData])

	return(
		<div className = 'landing-page-right'>
			<h1>LOGIN</h1>

			<div>
				{ loginLoading ? ( <Loader active inline='centered' /> ) : ''}
				{ loginError ? (

					<Message negative>
						<label>{ loginSyntax.title }</label>
					</Message>

				) : '' }
			</div>

			<Form.Field>
				<label>Email</label>
				<Form.Input 
					placeholder = 'John@yahoo.com'
					fluid
					name = 'email'
					value = { loginState.email }
					onChange = { onChange }
				/>
			</Form.Field>
			<Form.Field>
				<label>Password</label>
				<Form.Input 
					placeholder = '*********'
					fluid
					type = 'password'
					value = { loginState.password }
					name = 'password'
					onChange = { onChange }
				/>
				</Form.Field>
				<label>Forgot password</label>
				<label>Register here</label>
				<Form.Field>
					<Button onClick = { loginHandler } primary style = {{ width: '50%'}}>Login</Button>
				</Form.Field>
		</div>
	)	
}

export default Login