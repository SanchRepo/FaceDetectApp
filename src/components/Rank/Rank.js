import React from 'react'

// displays the number of entries on the home page
const Rank = ({username, entries}) => {
	return (

		<>
			<div className="f3 white tc">
				<p>{` ${username} your current rank is`}</p>
			</div>
			<div className="f1 white tc">
				<p>{`${entries}`}</p>
			</div>


		</>




		)





}

export default Rank