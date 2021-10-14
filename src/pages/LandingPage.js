import {useEffect,useState} from 'react'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'


import { useQuery } from '@apollo/client'
import { AUTHENTICATE_USER_TOKEN_QUERY } from '../graphql/query/userQuery'


import { Container, Grid, Button, Header, Icon, Form, Label,Image } from 'semantic-ui-react'

// component
import Login from '../components/Login'


import 'semantic-ui-css/semantic.min.css';
import './landing-page.css'

function LandingPage ()  {


	const history = useHistory()

 	const [ auth,setAuth ] = useState(false)
 	const [ user,setUser ] = useState({})

  	const { data,loading,error } = useQuery(AUTHENTICATE_USER_TOKEN_QUERY,{
    	variables: {
    	  	token: Cookies.get('token')
    },
    onCompleted: val => {
    	setUser(val.authLogin)


	    history.push({
	      	pathname: '/home',
	      	state: {
	      		auth: true,
	      		user: val.authLogin
	      	}
	    })
    }
  })

  useEffect(() => {

  },[])


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