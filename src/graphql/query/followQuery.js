

import { gql } from '@apollo/client'


export const CHECK_FOLLOW_USER_QUERY = gql`
	query isFollow( $profileId: String ) {
		isFollow( profileId: $profileId )
	}
`
