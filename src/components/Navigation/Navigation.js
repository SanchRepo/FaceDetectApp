import React from 'react';
import "./Navigation.css";


const Navigation = ({routeChange, isSignedIn}) => {

	if (isSignedIn){
		return(
		           
			<nav> 
				<p onClick={() => routeChange("signin")} className =" f3 dim black underline link pointer pa3">Sign Out</p> 
			</nav>
		
		);
	} else {
		return(
			<nav> 
				<p onClick={() => routeChange("signin")} className =" f3 dim black underline link pointer pa3">Sign In </p>
				<p onClick={() => routeChange("register")} className =" f3 dim black underline link pointer pa3">Sign Up </p>  
			</nav>
		);

	}








}

export default Navigation 