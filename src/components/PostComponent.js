
import React,{ useState,useEffect } from 'react'
import { Input,Grid,Icon,Button,Label,Loader,TextArea,Form,Image } from 'semantic-ui-react'

import { useMutation,useQuery } from '@apollo/client'

import { UPLODATE_IMAGE_MUTATION,UPLOAD_IMAGE_DELETE_MUTATION } from '../graphql/mutation/userMutation'
import { CREATE_POST_MUTATION } from '../graphql/mutation/postMutation'

const PostComponent = () => {

	const contextRef = React.useRef()
	const [urlSyntax,setUrlSyntax] = useState({})
	const [postSyntax,setPostSyntax] = useState({})
	const [image,setImage] = useState('')
	const [post,setPost] = useState({
		body: ''
	})
	// mutation

	const [ url , { data:urlData,loading:urlLoading,error:urlError } ] = useMutation(UPLODATE_IMAGE_MUTATION,{
		onError(e){
			setUrlSyntax(e.graphQLErrors[0].extensions.error)
			errorImage(e)
		},
		onCompleted: (val) => {
			setUrlSyntax('')
			setImage(val.uploadImage)
		} 
	})

	const [ deleteImage ] = useMutation(UPLOAD_IMAGE_DELETE_MUTATION)
	const [ postMutation ] = useMutation(CREATE_POST_MUTATION,{
		onError(e) {
			setPostSyntax(e.graphQLErrors[0].extensions.error)
		},
		onCompleted: (val) => {
			setPostSyntax('')
			setPost(e => ({body: ''}))
		}
	})  

	const errorImage = (e) => {
		setImage('')
	}

	const postHandler = (e) => {
		e.preventDefault() 
		postMutation({
			variables: {
				body: post.body,
				image: image.url,
			}
		})
	} 

	const fileHanlder = (e) => {
		const { type } = e.target.files[0]
		const file = e.target.files[0]

		if(image.public_id) {
			deleteUpload(image.public_id)
		}

		if(type == 'image/png' || type == 'image/jpeg' ) {
			url({
				variables: {
					image: file
				}
			})
			return 
		}
		return 
		
	}

	async function deleteUpload(public_id) {
		deleteImage({
			variables: {
				publicId: image.public_id
			}
		})
	}


	return(
		<Grid>
			<Grid.Row>
				<Grid.Column width = { 10 } className = 'centered grid'>
					<div>
						<Form>
						<label className = 'catch-error'>{ postSyntax.title }</label>
						<TextArea 
							placeholder = 'Input some text...'
							style = {{ resize: "none"}}
							value = { post.body }
							onChange = { e => setPost( (val) => ({ ...val, body: e.target.value }) ) }
						/>
						</Form>
					</div>
					<div>	
						<Image src = { image.url }  centered  className = 'padding-1' style = {{  maxHeight: '400px'}}  />
					</div>
					<div style = {{ display:'flex' ,justifyContent: 'space-between' }}>
						<Button 
							as = 'label'
							basic 
						>	
							<Icon name = 'image' />
							Image
							<label> </label>
							{ urlLoading ?  <Loader active size = 'mini' inline = 'right'/> : '' }
							<label> </label>
							{ urlData ? <Icon name = 'check' className = 'green' /> : '' }
							<input type = 'file' hidden 
								accept = "image/*"
								onChange = { fileHanlder }
							/>
							
						</Button>
						<label className = 'catch-error'>{ urlSyntax.title }</label>
						<Button onClick = { postHandler } primary basic >Post</Button>
					</div>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)

}


export default PostComponent