import React from 'react';


class Register extends React.Component {
	constructor(props){
		super(props);
		this.state={
			username:"",
			email:"",
			pass:""
		}
	}

	usernameInputChange = (event) => {
		this.setState({username:event.target.value})

	}

	emailInputChange = (event) => {
		this.setState({email:event.target.value})

	}

	passInputChange = (event) => {
		this.setState({pass:event.target.value})
	}

	validateEmail = (email) => {

		const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		return validRegex.test(String(email).toLowerCase());
	}

	registerSubmit = async (event) => {
		if (this.state.username === "" || this.state.email === "" || this.state.pass === "") {
			alert("A field is empty!");
		} else if (/\s/.test(this.state.username) || /\s/.test(this.state.email) || /\s/.test(this.state.pass)) { 
    
			alert("A field has spaces!");


		} else if (!this.validateEmail(this.state.email)) {
			alert("Incorrect email format!");
		
		} else {
			//After the user clicks submit, the data is sent to the backend to store the information in the database
			console.log(this.state.username)
			// const res = await fetch("http://localhost:3001/register",{
			const res = await fetch("https://appserver-xdco.onrender.com/register",{	
				method:'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username:this.state.username,
					email:this.state.email,
					password:this.state.pass
				})
				
			});
			const userData = await res.json();
			//using the functions in App.js
			this.props.loadUser(userData);  //puts the current state as the newly registered user
			this.props.routeChange("home"); //logs in
		}
	};

//Form from tachyons website, important thing to note here is the onchange for each input tokeep track of field. The submit triggers
//the registerSubmit function
	render(){

		return (
		<article className="br1 ba dark-gray b--black-10 mv4  w-50-m w-25-l shadow-5 center">

				<main className="pa4 black-80">
				  <div className="measure center">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
{/*				      <div className="mt3">
				        <label className="db fw6 lh-copy f6">First Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="fname"  id="fname"/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6">Last Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="lname"  id="lname"/>
				      </div>*/}

				      <div className="mt3">
				        <label className="db fw6 lh-copy f6">Username</label>
				        <input
				        onChange={this.usernameInputChange} 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="uname"  
				        id="uname"/>
				      </div>				      				      



				      <div className="mt3">
				        <label className="db fw6 lh-copy f6">Email</label>
				        <input
				        onChange={this.emailInputChange} 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" >Password</label>
				        <input 
				        onChange={this.passInputChange}
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password"/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={this.registerSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
				    </div>
				    <div className="lh-copy mt3">
				    </div>
				  </div>
				</main>
			</article>
	)
	};

};

export default Register
	






