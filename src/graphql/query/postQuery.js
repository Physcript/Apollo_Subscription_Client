
import { gql } from '@apollo/client'

export const GET_PERSON_POST_QUERY = gql`
	query personPost( $profileId: String $index: Int  ) {
		personPost ( profileId: $profileId index: $index ) {

			count
			post {
				_id
				body
				name
				image
				profileId
				createdAt
			}

		}
	}

`