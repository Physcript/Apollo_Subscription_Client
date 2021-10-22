import React , { useState,useEffect } from 'react'
import { Grid,Button,Input,Form,Dropdown,Image,Popup,Loader } from 'semantic-ui-react'

import { useHistory ,  Link } from 'react-router-dom'

import { useMutation,useQuery } from '@apollo/client'
import { SEARCH_USER_PROFILE_MUTATION } from '../graphql/mutation/userMutation'

const SearchComponent = () => {
	const history = useHistory()
	const contextRef = React.useRef()
	const [ searchData,setSearchData ] = useState('')
	const [ isOpen,setIsOpen ] = useState(false)
	const [ searchUser,setSearchUser ] = useState([])

	const [ findUser , { data:findData,loading:findLoading,error:findError } ] = useMutation(SEARCH_USER_PROFILE_MUTATION,{
		onError(e) {
			console.log(e)
		},
		onCompleted: (val) => {
			setSearchUser(val.findUser)
		}
	})

	const openSearch = () => {

		setIsOpen(false)
	}

	const forceClose = () => {
		setIsOpen(false)
	}



	const searchHandler = (e) => {
		setSearchData(e.target.value)
		setIsOpen(true)
		findUser({
			variables: {
				email: e.target.value
			}
		})
	}


	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width = { 10 } className = 'centered grid'>
					<div className = 'display-center padding-1' 

					onBlur = { (e) => {
						    if ( !e.currentTarget.contains( e.relatedTarget ) ) {
						     
						    }else {
						    	setIsOpen(false)	
						    }
						  }
						 }
					>
					
					<strong ref={contextRef}>
					<Input 
						id = 'my'
						size = 'mini'
						onChange = { searchHandler }
						style = {{ width: '200px' }}
						placeholder = 'Search User'
						onFocus = { (e) => {
							if (e.currentTarget === e.target) {
          						setIsOpen(false)
        					} else {
        						setIsOpen(false)	
        					}	

        					 if ( !e.currentTarget.contains( e.relatedTarget ) ) {
						      setIsOpen(false)	
						    }
						  
						}}

						
					/>
					</strong>

					<Popup
						className = 'my'
						context={contextRef}
						open = { isOpen }
						onClose = { forceClose }
     					content= { 

     						searchUser.map ((val) => (
					      					
						      			<div  className = 'my' key = {val.profileId} style = {{ display: 'block' }}  >

						      				<Link className = 'my' to = { `/user/${val.profileId}` } onClick = { (e) => { setIsOpen(false) } } >
						      					<div className = 'my' style = {{ display: 'flex' , alignItems: 'center' , padding: '10px'}}>
						      						{ findLoading ? ( <Loader active inline='center' /> ) : '' }
								      				<Image className = 'my' src = { val.image } size = 'mini' circular style = {{ height: '35px', width: '35px',margin: '0 10px'}} />
								      				<label className = 'my'>{val.firstName} { val.lastName }</label>
						      					</div>
						      				</Link>

						      			</div>

					   		) )
					   		.concat(
					   		
					   		<div style = {{ textAlign: 'center' }}>
						      	<Link>
						      		<label> See more result </label>
						      	</Link>
						    </div>
					   		
					   		)


					   }

     					basic
     					position= 'bottom left'
     					style = {{ width: '200px' }}

	            	/>



					</div>
					
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default SearchComponent