
import { useState,useEffect } from 'react'

import ChangeImage from '../images/change.png'

import { useMutation,useQuery } from '@apollo/client'
import { FORGOT_PASSWORD_FINAL_MUTATION } from '../graphql/mutation/userMutation' 

import { useParams,Link } from 'react-router-dom'
import { Container,Icon,Input,Button,Loader,Image } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

const ChangePage = () => {

	let { forgottoken } = useParams();

	// mutation
	const [ updateSyntax,setUpdateSyntax ] = useState({})
	const [ update , 
		{ data: updateData,loading: updateLoading,error: updateError } 
	] = useMutation(FORGOT_PASSWORD_FINAL_MUTATION, {
		onError(e){
			setUpdateSyntax(e.graphQLErrors[0].extensions.error)
		}
	})

	const [ password,setPassword ] = useState({
		password: '',
		confirmPassword: '',
	})
	
	const onChange = (e) => {
		e.preventDefault()
		const { name,value } = e.target
		setPassword( (val) => ({
			...val,
			[name]: value
			}) 
		)
	}

	const updateHandler = (e) => {
		e.preventDefault()
		if(updateLoading) return 
		update({
			variables: {
				password: password.password,
				confirmPassword: password.confirmPassword,
				token: forgottoken
			}
		})
	}

	useEffect( () => {
		if(updateData) console.log(updateData)
	},[updateData])


	return (
		<div style = {{ background: `url(${ ChangeImage })`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} >
			<Container>
			<div className = 'arrow-left-back'>
				<Link to = '/'><Icon name = 'arrow left' />Back</Link>
			</div>
			<div className = 'display-center-v3' style = {{ marginTop: '-20px' }}>
				{ updateLoading ? ( <Loader active inline = 'centered'/> ) :  (
					<div className = 'center-v4' style = {{ color: '#Ee7474' }}>
						{ updateSyntax.title }
						{ updateSyntax.password }
					</div>
				)  }
				{ !updateData ? (
				<div className = 'center-v4' style = {{ background: 'white' }} >
					<h1 className = '' >Change password</h1>
					<label >Password</label>
					<Input 
						type = 'password'
						placeholder = '*******'
						name = 'password'
						value = { password.password }
						onChange = { onChange }
					/>
					<label>Confirm Password</label>
					<Input 
						type = 'password'
						placeholder = '*******'
						name = 'confirmPassword'
						value = { password.confirmPassword }
						onChange = { onChange }
					/>
					<Button onClick = { updateHandler } primary fluid  disabled = { updateLoading } >Update</Button>
				</div>	
				) : (
					<div className = 'center-v4'>
						<Image centered src = 'https://res.cloudinary.com/dnnq8kne2/image/upload/v1633696698/System/ch_i7jxrf.png' />
						<p>Password has been reset</p>
					</div>
				) }
			</div>
			</Container>
		</div>
	)
}

export default ChangePage