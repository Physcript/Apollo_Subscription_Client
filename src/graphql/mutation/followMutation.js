

import { gql } from '@apollo/client'


export const FOLLOW_USER_MUTATION = gql`
	mutation follow( $followerId: String){
		follow( followerId: $followerId)
	}
`