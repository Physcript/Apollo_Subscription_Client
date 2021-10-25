import { useEffect,useState } from 'react'
import { useHistory,Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { Container, Grid, Button, Header, Icon, Form, Label, Loader,Message } from 'semantic-ui-react'

// graphql apollo

import { useMutation } from '@apollo/client'
import { LOGIN_USER_MUTATION } from '../graphql/mutation/userMutation'

const Login = () => {

	// mutation

	const [ loginSyntax, setLoginSyntax ] = useState({})
	const [ login, { data: loginData, loading: loginLoading, error: loginError } ] = useMutation(LOGIN_USER_MUTATION, {
		onError(e) {
			// setLoginSyntax(e.graphQLErrors[0].extensions.error)
			console.log(e)
		},
		onCompleted: e => {
			setLoginSyntax({})
			Cookies.set('token',e.loginUser , {  expires: 7 ,secure: true })
			localStorage.setItem('token',e.loginUser)
			history.push({
				pathname: '/home',
				state: { auth: true }
			})
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
				<label><Link to = '/forgotpassword'>Forgot password</Link></label>
				<label><Link to = '/register'>Register here</Link></label>
				<Form.Field>
					<Button onClick = { loginHandler } primary style = {{ width: '50%'}}>Login</Button>
				</Form.Field>
		</div>
	)	
}

export default Login