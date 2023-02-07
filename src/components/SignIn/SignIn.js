import React from 'react';


class SignIn extends React.Component {
	constructor(props){
		super(props)
		this.state= {
			signInEmail:"",
			signInPass:""
		}
	}

	emailInputChange = (event) => {
		this.setState({signInEmail:event.target.value})

	}

	passInputChange = (event) => {
		this.setState({signInPass:event.target.value})
	}

	signInSubmit = async (event) => {
		//console.log(this.state)
		const res = await fetch("http://localhost:3001/signin",{
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email:this.state.signInEmail,
				password:this.state.signInPass
			})
			
		});
		const userData = await res.json();
		//console.log(userData)
		if (userData.id) {
			this.props.loadUser(userData)
			this.props.routeChange("home")
		}
	};


	render(){
		const{ routeChange } = this.props;
		return (
			<article className="br1 ba dark-gray b--black-10 mv4  w-50-m w-25-l shadow-5 center">

					<main className="pa4 black-80">
					  <div className="measure center">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
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
					      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
					    </fieldset>
					    <div className="">
					      <input onClick={this.signInSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
					    </div>
					    <div className="lh-copy mt3">
					      <p onClick = {()=> routeChange("register")} className="f6 link dim black db pointer">Sign up</p>
					      <p className="f6 link dim black db">Forgot your password?</p>
					    </div>
					  </div>
					</main>
			</article>
		);

	}



};

export default SignIn;