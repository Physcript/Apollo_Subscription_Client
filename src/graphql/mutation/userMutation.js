

import { gql } from '@apollo/client'

export const LOGIN_USER_MUTATION = gql`
	
	mutation loginUser($email: String $password: String){
		loginUser(email: $email password: $password )
	}

` 