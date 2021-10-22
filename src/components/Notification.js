
import React, { useEffect,useState } from 'react'
import Cookies from 'js-cookie'
import { useSubscription,useQuery } from '@apollo/client'

import { FOLLOW_NOTIFICATION_SUBSCRIPTION } from '../graphql/subscription/followSubscription'
import { AUTHENTICATE_USER_TOKEN_QUERY } from '../graphql/query/userQuery'
import { useHistory } from 'react-router-dom'

import { Icon,Image,Popup } from 'semantic-ui-react'


const timeoutLength = 5000

const Notification = ({logout = true , action = true }) => {

	const history = useHistory()
	const contextRef = React.useRef()
	const [person,setPerson] = useState({})

	const { data,loading,error } = useQuery(AUTHENTICATE_USER_TOKEN_QUERY,{
    	variables: {
    	  	token: Cookies.get('token')
   	 	}
   	})


	const [ popupNotif,setPopupNotif ] = useState ({ 
		isOpen: false 
	})

	const handleOpen = () => {
		if(!action) return  
    setPopupNotif({ isOpen: true })

    setTimeout(() => {
      setPopupNotif({ isOpen: false })
  	  }, timeoutLength)
  	}

	const handleClose = () => {
		setPopupNotif({ isOpen: false })
	}

	const { data: notifData, loading:notifLoading, error:notifError } = useSubscription(FOLLOW_NOTIFICATION_SUBSCRIPTION,{
		variables: {
			profileId: person.profileId
		}
	})


	const logoutHandler = (e) => {
		e.preventDefault()
		Cookies.remove('token')
		history.push('/')
	}

	useEffect(()=> {

		if(notifData) handleOpen()
		if(data) setPerson(data.authLogin)

	},[notifData,data]) 

	return (

		<div>
			<Popup
							context={contextRef}
	            content={ notifData?.followNotification.body}
	            open={ popupNotif.isOpen } 
	            onOpen={ handleOpen }
	            position='top center'

			/>
			<strong ref={contextRef}><Icon name = 'bell' style = {{ padding: '0px 20px' }} /></strong> 
			{ logout ? (
			<label onClick = { logoutHandler }>Logout</label> 
			) : '' } 
		</div>
	)
}


export default Notification