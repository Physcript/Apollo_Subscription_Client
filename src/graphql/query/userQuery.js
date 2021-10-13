


import { gql } from '@apollo/client'


export const AUTHENTICATE_USER_TOKEN_QUERY =  gql`
	
	query authLogin( $token: String ) {
		authLogin( token: $token ) {

			_id
			firstName
			lastName
			image
			email
			verified
			createdAt

			}
	}

`


