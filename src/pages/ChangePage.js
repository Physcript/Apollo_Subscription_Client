
import { useState,useEffect } from 'react'

import ChangeImage from '../images/change.png'

import {useMutation,useQuery} from '@apollo/client'

import { useParams,Link } from 'react-router-dom'
import { Container,Icon,Input,Button } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

const ChangePage = () => {

	const [ password,setPassword ] = useState({
		password: '',
		confirmPassword: '',
	})
	
	let { forgottoken } = useParams();

	return (
		<div style = {{ background: `url(${ ChangeImage })`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} >
			<Container>
			<div className = 'arrow-left-back'>
				<Link to = '/'><Icon name = 'arrow left' />Back</Link>
			</div>
			<div className = 'display-center-v3' style = {{ marginTop: '-20px' }}>
				<div className = 'center-v4' style = {{ background: 'white' }} >
					<h1 className = '' >Change password</h1>
					<label >Password</label>
					<Input />
					<label>Confirm Password</label>
					<Input />
					<Button primary fluid>Update</Button>
				</div>
			</div>
			</Container>
		</div>
	)
}

export default ChangePage