
import { gql } from '@apollo/client'

export const  CREATE_POST_MUTATION = gql`
	mutation createPost ( 
	$body: String 
	$image: String 
	) {
		createPost ( 
			body: $body
			image: $image
		)
	}
`

