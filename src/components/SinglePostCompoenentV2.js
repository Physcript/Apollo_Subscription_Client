

import { useState,useEffect } from 'react'
import { Grid,Button,Loader,Image } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'


const SinglePostCompoenentV2 = ( {postData,index} ) => {
	const history = useHistory()
	const [post,setPost] = useState(postData)
	const [see,setSee] = useState(200)

	const seeHandler = (e) => {

		if(e.target.textContent === 'See more') {
			e.target.textContent = 'See less'
			setSee(999)
		}else {
			e.target.textContent = 'See more'
			setSee(200)
		}

	} 

	const viewHandler = (e) => {
		e.preventDefault()
		history.push(`/user/${post.profileId}`)
	}

	return(
		<div>
			<div style = {{ background: '#ffffff', padding: '20px' , margin: '20px'  }} >
				<div style = {{ display: 'flex' , justifyContent: 'space-between', alignItems: 'center'  }} >
					<div onClick = { viewHandler } style = {{ display: 'flex' ,  alignItems: 'center', padding: '10px 10px' }}>
						<Image src = { post.userImage } circular size = 'mini' style = {{ margin: '0 10px', width: '25px' , height: '25px'}}  />
						<label>{post.name}</label> <label> </label>
					</div>
					<label>{ moment(post.createdAt).fromNow() }</label>
				</div>

				<div className = 'display-flex' style = {{ padding: '20px' }}>
					<label style = {{ overflowWrap: 'break-word' }} >

						{ post.body.length > 200 ? (
									
							post.body.slice(0, see).concat( ` . . .` )
									
						): post.body }
								
						{ post.body.length > 200 ? ( <label 
							onClick =  { seeHandler }
							style = {{ color: 'blue' , padding: '10px 0px' }} >See more</label> ) : '' 
						}

					</label>

				</div>

				<div>
					<Image src = { post.image } style = {{ maxHeight: '200px' }} centered/>
				</div>

			</div>
		</div>
	)
}

export default SinglePostCompoenentV2