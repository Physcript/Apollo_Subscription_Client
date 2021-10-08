import { useEffect,useState } from 'react'


import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION } from '../graphql/mutation/userMutation'


import { Container, Grid, Button, Header, Icon, Form, Label, Loader,Message,Input } from 'semantic-ui-react'

const Register = () => {

	// mutation

	const [ fetchResult, { data,loading,error } ] = useMutation(CREATE_USER_MUTATION,{
		onError(e){
			setRegisterSyntax(e.graphQLErrors[0].extensions.error)
		},
		onCompleted: val => {
			setRegisterSyntax({})
			setRegisterData( e => ({
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
			}) )

			console.log(val)
		}
	})



	const [ registerSyntax, setRegisterSyntax ] = useState({})
	const [ registerData, setRegisterData ] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const onChange = (e) => {
		const { name,value } = e.target
		setRegisterData( val => ({ ...val, [name]:value }) )
	}

	const registerHandler = (e) => {
		e.preventDefault()

		if(loading) return 

		fetchResult({
			variables: {
				firstName: registerData.firstName,
				lastName: registerData.lastName,
				email: registerData.email,
				password: registerData.password,
				confirmPassword: registerData.confirmPassword
			}
		})
	}

	useEffect( () => {

	},[data])

	return (
		<div className = 'display-center minus'>
			<h1>Register</h1>
				<div className = 'flex-gap' >

					{ loading ? ( <Loader active inline='centered' /> ) : '' }
					{ data ? (
						<Message>
							User Created 
						</Message>
					): '' }

					<label>Firsname</label>
					<Input 
						style = {{ width: '300px' }}
						placeholder = 'John'
						name = 'firstName'
						value = { registerData.firstName }
						onChange = { onChange }
						error = { registerSyntax.firstName }
						fluid
					/>
					<label>Lastname</label>
					<Input 
						style = {{ width: '300px' }}
						placeholder = 'Santos'
						name = 'lastName'
						value = { registerData.lastName }
						onChange = { onChange }
						error = { registerSyntax.lastName }
						fluid
					/>
					<label>Email</label>
					<Input 
						style = {{ width: '300px' }}
						placeholder = 'john.santos@yahoo.com'
						name = 'email'
						value = { registerData.email }
						onChange = { onChange }
						error = { registerSyntax.email }
						fluid
					/>
					<label>Password</label>
					<Input 
						style = {{ width: '300px' }}
						placeholder = '******'
						type = 'password'
						name = 'password'
						value = { registerData.password }
						onChange = { onChange }
						error = { registerSyntax.password }
						fluid
					/>
					<label>Confirm Password</label>
					<Input 
						style = {{ width: '300px' }}
						placeholder = '******'
						type = 'password'
						name = 'confirmPassword'
						value = { registerData.confirmPassword }
						onChange = { onChange }
						error = { registerSyntax.confirmPassword }
						fluid
					/>

					<Button onClick = { registerHandler } primary>Register</Button>
				</div>

					
		</div>
	)
}

export default Register