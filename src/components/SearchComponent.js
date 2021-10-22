import React , { useState,useEffect } from 'react'
import { Grid,Button,Input,Form,Dropdown,Image,Popup } from 'semantic-ui-react'

import { useHistory ,  Link } from 'react-router-dom'

import { useMutation,useQuery } from '@apollo/client'
import { SEARCH_USER_PROFILE_MUTATION } from '../graphql/mutation/userMutation'

const SearchComponent = () => {
	const history = useHistory()
	const contextRef = React.useRef()
	const [ searchData,setSearchData ] = useState('')
	const [ searchUser,setSearchUser ] = useState([])

	const [ findUser , { data:findData,loading:findLoading,error:findError } ] = useMutation(SEARCH_USER_PROFILE_MUTATION,{
		onError(e) {
			console.log(e)
		},
		onCompleted: (val) => {
			setSearchUser(val.findUser)
		}
	})

	const searchHandler = (e) => {

		findUser({
			variables: {
				email: e.target.value
			}
		})
	}

	const searchPage = (data) => {
		console.log(data)
	}


	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width = { 10 } className = 'centered grid'>
					<div className = 'display-center padding-1'>
					
					<strong ref={contextRef}>
					<Input 
						size = 'mini'
						onChange = {searchHandler}
						style = {{ width: '200px' }}
						placeholder = 'Search User'
						
					/>
					</strong>

					<Popup
						context={contextRef}
						open= { searchUser.length >= 1 }
     					content= { searchUser.map ((val) => (
					      					
						      			<div key = {val.profileId} >
						      				<Link to = { `/user/${val.profileId}` }>
						      					<div style = {{ display: 'flex' , alignItems: 'center' , padding: '10px'}}>
						      				<Image src = { val.image } size = 'mini' circular style = {{ height: '35px', width: '35px',margin: '0 10px'}} />
						      				<label>{val.firstName} { val.lastName }</label>
						      					</div>
						      				</Link>
						      			</div>

					   	) )  
					   }
     					basic
     					position= 'top left'
     					style = {{ width: '200px' }}

	            	/>



					</div>
					
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default SearchComponent