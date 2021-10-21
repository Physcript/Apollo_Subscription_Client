
import React,{ useState,useEffect } from 'react'
import { Input,Grid,Icon,Button,Label,Loader,TextArea,Form,Image } from 'semantic-ui-react'

import { useMutation,useQuery } from '@apollo/client'

import { UPLODATE_IMAGE_MUTATION } from '../graphql/mutation/userMutation'

const PostComponent = () => {

	const contextRef = React.useRef()
	const [urlSyntax,setUrlSyntax] = useState({})
	const [image,setImage] = useState('')
	// mutation

	const [ url , { data:urlData,loading:urlLoading,error:urlError } ] = useMutation(UPLODATE_IMAGE_MUTATION,{
		onError(e){
			setUrlSyntax(e.graphQLErrors[0].extensions.error)
			errorImage(e)
		},
		onCompleted: (val) => {
			setUrlSyntax('')
			setImage(val.uploadImage.url)
		} 
	})

	const errorImage = (e) => {
		setImage('')
	}

	const fileHanlder = (e) => {
		const { type } = e.target.files[0]
		const file = e.target.files[0]

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

	return(
		<Grid>
			<Grid.Row>
				<Grid.Column width = { 10 } className = 'centered grid'>
					<div>
						<Form>
						<TextArea 
							placeholder = 'Input some text...'
							style = {{ resize: "none"}}
						/>
						</Form>
					</div>
					<div>	
						<Image src = { image }  centered  className = 'padding-1' style = {{  maxHeight: '400px'}}  />
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
						<Button primary basic >Post</Button>
					</div>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)

}


export default PostComponent