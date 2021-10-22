import { useState,useEffect } from 'react'

import { Icon,Image,Button } from 'semantic-ui-react'


//
import { CHECK_FOLLOW_USER_QUERY,COUNT_FOLLOW_AUTH_QUERY } from '../graphql/query/followQuery'
//
import { FOLLOW_USER_MUTATION } from '../graphql/mutation/followMutation'
//
import { useQuery,useMutation } from '@apollo/client'

// 
import { useHistory } from 'react-router-dom'

// component
import Notification from './Notification'

import 'semantic-ui-css/semantic.min.css'
import './view-profile.css'

const ViewProfile = ({user}) => {

	const history = useHistory()
	

	if(user == null) {
		history.push('/')	
	}

	const [ dataCount, setDataCount ] = useState({})
	const [ followStatus,setFollowStatus ] = useState(false)

	const { data:isFollowData,loading:isFollowLoading,error:isFollowError,refetch: isFollowRefetech } = useQuery(CHECK_FOLLOW_USER_QUERY,{
		variables: {
			profileId: user?.profileId
		}
	})

	const { data: countData,loading:countLoading,error:countError, refetch: countRefetch } = useQuery(COUNT_FOLLOW_AUTH_QUERY,{
		variables: {
			profileId: user?.profileId
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
		if(followData)	followFunction()	
		if(countData) setDataCount(countData.countFollow)

		function followFunction() {
			isFollowRefetech()
			countRefetch()
		}

	},[isFollowData,followData,countData])

	return(
		<div>

			<div className = 'display-center-v3' style = {{}}>

				<div className = 'padding-1' style = {{ padding: '20px 0' }} style = {{ display: 'flex', justifyContent: 'space-between' }} >
					<div onClick = { () => history.push('/home') } >
						<Icon name = 'arrow left' />
						<label>Home</label>
					</div>
					<Notification />
				</div>

				<div>

					<Image src = { user?.image } style = {{ maxWidth: '80%', minWidth: '70%' }} />

					<div>
						{ followStatus ? (
							<div>
								<Button disabled = { dataCount.profileId } primary onClick = { followHanlder }>Follow me <span><Icon name = 'heart'/></span> </Button>
							</div>
						): (
							<div>
								<Button disabled = { dataCount.profileId } basic onClick = { followHanlder } >Followed <span><Icon name = 'heart red'/></span> </Button>
							</div>
						)}
					</div>

					<div className = 'display-flex'>
						<label>{ user?.lastName } { user?.firstName }</label>
						<label>Follower: { dataCount.countFollower }</label>
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