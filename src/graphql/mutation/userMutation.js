

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

export const FORGOT_PASSWORD_FINAL_MUTATION = gql`
	mutation changePassword($password: String $confirmPassword: String $token: String){
		changePassword(password: $password confirmPassword: $confirmPassword token: $token) 
	}
`

export const UPLODATE_IMAGE_MUTATION = gql`
	mutation uploadImage( $image: Upload ){
		uploadImage( image: $image ){
			public_id
			url
		}
	}
`

export const UPLOAD_IMAGE_DELETE_MUTATION = gql`
	mutation deleteImage( $publicId: String ){
		deleteImage( publicId: $publicId )
	}
`

export const UPDATE_USER_PROFFILE_MUTATION = gql`
	mutation updateUser( $firstName: String $lastName: String $image: String){
		updateUser( firstName: $firstName lastName: $lastName image: $image )
	}
`

export const SEARCH_USER_PROFILE_MUTATION = gql`
	mutation findUser ( $email: String ) {
		findUser ( email: $email ) {
			firstName
			lastName
			image
			profileId
			email
		}
	}
`