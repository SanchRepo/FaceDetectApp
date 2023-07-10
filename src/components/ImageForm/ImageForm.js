import React from 'react';
import "./ImageForm.css"

//the input box to paste links into. A lot of css through tachyons which is imported in the index.css
const ImageForm = ({onChangeInput, onClickButton}) => {

	return (
		<>
			<div>
				<p className="f3 tc">
				{"This app uses two AI models, one in order to detect faces and another to give descriptors, to provide more information to an image. At the moment it only takes images given in the form of links. So upload the image onto the internet and paste the link below to give it a try!"}</p>
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