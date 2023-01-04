import React from 'react';
import './FaceRecog.css'



const FaceRecog = ({box, imgUrl}) => {
	return (
		<div className = "fcenter ma">
			<div className="absolute mt2" >
				<img id="imgSrc" alt= ''src ={imgUrl} 
				 width='500px' height='auto' 
				 />
				<div className= "box-boundary" style = {{top:box.topRow, bottom:box.botRow, right:box.rightCol, left:box.leftCol}}></div>
			</div>
		</div>

	)


}

export default FaceRecog