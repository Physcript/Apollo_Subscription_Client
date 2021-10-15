


import { gql } from '@apollo/client'


export const AUTHENTICATE_USER_TOKEN_QUERY =  gql`
	
	query authLogin( $token: String ) {
		authLogin( token: $token ) {

			_id
			firstName
			lastName
			image
			email
			profileId
			verified
			createdAt

			}
	}

`

export const GET_USER_BY_PROFILE_ID_QUERY = gql`
	query viewUser($profileId: String){
		viewUser(profileId: $profileId) {
			_id
			firstName
			lastName
			image
			email
			profileId
			verified
			createdAt
		}
	}
`


