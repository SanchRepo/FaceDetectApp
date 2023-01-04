import React from 'react';
import "./ImageForm.css"


const ImageForm = ({onChangeInput, onClickButton}) => {

	return (
		<>
			<div>
				<p className="f3 tc">
				{"This can detect faces from images. Put in a link to an image to test it out! "}</p>
				<div className = "fcenter">
					<div className="pa4 br3 fcenter pattern shadow-5">
						<input type="text" className="f4 pa2 w-70 fcenter" onChange={onChangeInput}/>
						<button className="grow link f4 ph3 pv2 w-30 dib white bg-light-purple" onClick={onClickButton}>{"Run"}</button>
					</div>
				</div>
			</div>
		</>
	)


}

export default ImageForm