import { useState,useEffect } from 'react'

import { Icon,Image,Button } from 'semantic-ui-react'


//
import { CHECK_FOLLOW_USER_QUERY } from '../graphql/query/followQuery'
//
import { FOLLOW_USER_MUTATION } from '../graphql/mutation/followMutation'
//
import { useQuery,useMutation } from '@apollo/client'


import 'semantic-ui-css/semantic.min.css'
import './view-profile.css'

const ViewProfile = ({user}) => {

	console.log(`user`,user)

	const [ followStatus,setFollowStatus ] = useState(false)

	const { data:isFollowData,loading:isFollowLoading,error:isFollowError,refetch: isFollowRefetech } = useQuery(CHECK_FOLLOW_USER_QUERY,{
		variables: {
			profileId: user.profileId
		}
	})

	const [ follow, { data:followData,loading:followLoading,error:followError } ] = useMutation(FOLLOW_USER_MUTATION)


	// handler
	const followHanlder = (e) => {
		e.preventDefault()
		follow({
			variables:{ 
				followerId: user.profileId
			}
		})
	}


	//

	useEffect(()=> {
		if(isFollowData) setFollowStatus(isFollowData.isFollow)
		if(followData)	isFollowRefetech()
	},[isFollowData,followData])

	return(
		<div>
			<div style = {{ padding: '20px 0' }}>
				<Icon name = 'arrow left' />
				Back
			</div>
			<div className = 'flex-gap'>

				<div>

					<Image src = { user.image }/>

					{ followStatus ? (
						<div>
							<Button primary onClick = { followHanlder }>Follow me <span><Icon name = 'heart'/></span> </Button>
						</div>
					): (
						<div>
							<Button basic onClick = { followHanlder } >Followed <span><Icon name = 'heart red'/></span> </Button>
						</div>
					)}
					<div className = 'display-flex'>
						<label>{ user.lastName } { user.firstName }</label>
						<label>followers 122</label>
					</div>
					
				</div>

				<div className = 'display-flex'>
					
					<label>Message</label>
					<label>Report</label>
				</div>


			</div>
		</div>
	)
}


export default ViewProfile