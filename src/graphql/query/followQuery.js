

import { gql } from '@apollo/client'


export const CHECK_FOLLOW_USER_QUERY = gql`
	query isFollow( $profileId: String ) {
		isFollow( profileId: $profileId )
	}
`


export const COUNT_FOLLOW_AUTH_QUERY = gql`
	query countFollow( $profileId: String ){
		countFollow( profileId: $profileId ){
			countFollower
			profileId
		}
	}
`