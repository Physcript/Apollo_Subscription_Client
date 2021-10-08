
import { useParams } from 'react-router-dom'
 

const ChangePage = () => {
	
	let { forgottoken } = useParams();
	console.log(forgottoken)

	return (
		<>
			<label>ChangePage</label>
		</>
	)
}

export default ChangePage