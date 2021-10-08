

import { gql } from '@apollo/client'

export const LOGIN_USER_MUTATION = gql`
	
	mutation loginUser($email: String $password: String){
		loginUser(email: $email password: $password )
	}

` 

export const CREATE_USER_MUTATION = gql`
	mutation createUser( 
		$firstName: String 
		$lastName: String
		$email: String
		$password: String
		$confirmPassword: String
	){
		createUser(
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
			confirmPassword: $confirmPassword
		)
	}
`

export const FORGOT_PASSWORD_MUTATION = gql`
	mutation forgotPassword( $email: String ){
		forgotPassword(email: $email)
	}
`