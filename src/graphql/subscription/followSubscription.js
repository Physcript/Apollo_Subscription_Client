

import { gql } from '@apollo/client'

export const FOLLOW_NOTIFICATION_SUBSCRIPTION = gql`
	subscription followNotification( $profileId: String ) {
		followNotification ( profileId: $profileId) {
			name
			body
			createdAt
		}
	}
`
