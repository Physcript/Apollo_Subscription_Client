
import { useState,useEffect } from 'react'
import myBackground from '../images/Forgot.png'

import { useMutation } from '@apollo/client'
import { FORGOT_PASSWORD_MUTATION } from '../graphql/mutation/userMutation'

import { Link } from 'react-router-dom'
import { Button,Input,Icon,Loader,Image,Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

const ForgotPage = () =>  {	

	// mutation
	const [forgotSyntax,setForgotSyntax] = useState({}) 
	const [fetchResult , {data,loading,error}] = useMutation(FORGOT_PASSWORD_MUTATION,{
		onError(e){
			setForgotSyntax(e.graphQLErrors[0].extensions.error)
		},
		onCompleted: (val) => {
			setForgotSyntax({})
		}
	})

	const [ forgotData,setForgotData ] = useState({
		email: ''
	}) 

	const onChange = (e) => {
		const { name,value } = e.target
		setForgotData( (val) => ({
			...val,
			[name]: value
			}) 
		)
	}


	const sendHandler = (e) => {
		e.preventDefault()
		if(loading) return
		fetchResult({
			variables:{
				email: forgotData.email
			}
		})
	}

	useEffect( () => {

	},[])

	return (
		<div style = {{ background: `url(${myBackground})` ,  backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center bottom'}}>
			<Container>
				<Icon name = 'arrow left' style = {{ padding: '50px 50px 0px 0px' }}/><Link to = '/'>Back</Link>
			</Container>
			<div className = 'display-center-v2 flex-gap' >
				

				{ loading ? <Loader active inline = 'centered' /> : '' }
		
				{ forgotSyntax.title ? ( <label style = {{ color: '#ff9b96' }}>{ forgotSyntax.title }</label> ) : '' }
				{ !data ? (
				<div className = 'flex-gap' style = {{ width: '300px', padding: '10px' }}>
				<label>Forgot Password</label>
					<Input 
						placeholder = 'john.kevin@yahoo.com'
						name = 'email'
						value = { forgotData.email }
						onChange = { onChange }
						error = { forgotSyntax.title }
						fluid
					/>
					<Button primary onClick = { sendHandler } >Send Confirmation</Button>
				</div>
				) : (
				<div className = 'padding-2'>
					<Image centered src = 'https://res.cloudinary.com/dnnq8kne2/image/upload/v1633696698/System/ch_i7jxrf.png' />
					<h1>Email Sent</h1>
					<p>Do not share your password to anyone</p> 
				</div>
				) }
			</div>
		</div>
	)
}

export default ForgotPage