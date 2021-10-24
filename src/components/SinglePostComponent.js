
import { useState,useEffect } from 'react'
import { Grid,Button,Loader,Image } from 'semantic-ui-react'

import { GET_PERSON_POST_QUERY } from '../graphql/query/postQuery'


import moment from 'moment'




const SinglePostComponent = ({data,persons,rq , countz , index}) => {

	const [person,setPerson] = useState({})
	const [ val, setVal ] = useState({})
	const [fixed , setFixed] = useState(0)

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


	const [ mainIndex,setMainIndex ] = useState(0)

	const pag = () => {

		rq(index + 3)


	}


	
	useEffect(() => {
		setPerson(persons)
		setVal(data)

		window.onscroll = (e) => {
			if((document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight - 50)  <= 0) {
				pag()
			}

		}
		

	},[persons,data])

	return (
		<div >
			<div style = {{ background: '#ffffff', padding: '20px' , margin: '20px'  }} >
							<div style = {{ display: 'flex' , justifyContent: 'space-between', alignItems: 'center'  }} >
								<div  style = {{ display: 'flex' ,  alignItems: 'center', padding: '10px 10px' }}>
									<Image src = { person.image } circular size = 'mini' style = {{ margin: '0 10px', width: '25px' , height: '25px'}}  />
									<label>{data.name}</label> <label> </label>
								</div>
								<label>{ moment(data.createdAt).fromNow() }</label>
							</div>

							<div className = 'display-flex' style = {{ padding: '20px' }}>
								<label style = {{ overflowWrap: 'break-word' }} >
								{ data.body.length > 200 ? (
									
									data.body.slice(0, see).concat( ` . . .` )
									
								): data.body }
								
								{ data.body.length > 200 ? ( <label 
									onClick =  { seeHandler }
									style = {{ color: 'blue' , padding: '10px 0px' }} >See more</label> ) : '' 
								}
								</label>

							</div>
							<div>
								<Image src = { data.image } style = {{ maxHeight: '200px' }} centered/>
							</div>


						</div>
		</div>
	)
}

export default SinglePostComponent