
import React, { useEffect,useState } from 'react'
import Cookies from 'js-cookie'
import { useSubscription,useQuery } from '@apollo/client'

import { FOLLOW_NOTIFICATION_SUBSCRIPTION } from '../graphql/subscription/followSubscription'
import { AUTHENTICATE_USER_TOKEN_QUERY } from '../graphql/query/userQuery'

import { Icon,Image,Popup } from 'semantic-ui-react'


const timeoutLength = 5000
const Notification = () => {

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

	useEffect(()=> {

		if(notifData) handleOpen()
		if(data) setPerson(data.authLogin)

	},[notifData,data]) 

	return (

		<div>
			
			<Icon name = 'bell' style = {{ padding: '0px 20px' }} /> 
			<label>Logout</label> 
			<Popup

	            content={ notifData?.followNotification.body}
	            open={ popupNotif.isOpen } 
	            onOpen={ handleOpen }
	            position = 'top'
	            style = {{ margin: '40px 210px' }}

			/>
		</div>
	)
}


export default Notification