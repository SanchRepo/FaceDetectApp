
import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageForm from '../components/ImageForm/ImageForm';
import FaceRecog from '../components/FaceRecog/FaceRecog';
import Rank from '../components/Rank/Rank';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register'
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg';
import './App.css';

window.process = {}
//console.log(Clarifai)

// Clarifai Authentication Information
const USER_ID = 'aseeker';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'dda4d4e1eefd43d5bab862d7f94bdcbe';
const APP_ID = 'my-first-application';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';    
//const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';




class App extends React.Component {
  constructor() {
    super();
    //the changeable variables within this App
    // input: This is the text that is currently in the Image Search  box
    //imgURL: After the user submits the image url from the input, it is saved into this variable
    //box: This is the boundary points of the face given to us from Clarifai that changes from image to image
    //route: This variable holds the current display the user is on. Such as homepage, signin, and register.
    //IsSignedIn: This variables is a boolean that holds if the user is signed in or not to change the nav bar accordingly
    //user: This holds all the relevant user information that the database sends back for frontend to use
    this.state = {
      input:'',
      imgUrl:'',
      box:{},
      route:'signin',
      isSignedIn: false,
      user: {

        id:"",
        username:"",
        email:"",
        entries: 0,
        joined:""

      }

    };
  };

//   async componentDidMount() {
//     const res = await fetch("http://localhost:3001");
//     const data = await res.json();
//     console.log(data);

// };

// // This function is used to obtain the Clarifai Api data
// // It returns the box boundaries which is parsed from the data sent by Clarifai
// apiData = async (IMAGE_URL) => {
//     const raw = JSON.stringify({
//         "user_app_id": {
//             "user_id": USER_ID,
//             "app_id": APP_ID
//         },
//         "inputs": [
//             {
//                 "data": {
//                     "image": {
//                         "url": IMAGE_URL
//                     }
//                 }
//             }
//         ]
//     });

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Key ' + PAT
//         },
//         body: raw
//     };

//     // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
//     // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
//     // this will default to the latest version_id

//     // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
//     //     .then(response => response.text())
//     //     .then(result => console.log(result))
//     //     .catch(error => console.log('error', error));

//     const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions) 
//     const data = await response.json();
//     const box = data.outputs[0].data.regions[0].region_info.bounding_box;
//     //console.log(box)
//     return box
// };

// apiData = (IMAGE_URL) => {
//     fetch("https://localhost:3001/grpc", {
//     method: "POST",
//     headers: {
//       'Content-Type':'application/json'
//     },
//     body: JSON.stringify({"imgurl": IMAGE_URL})

//   })
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
    
// }


apiData = async (IMAGE_URL) => {

  // const res = await fetch("http://localhost:3001/face", {
  const res = await fetch("https://appserver-xdco.onrender.com/face", {
      method: "POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({"imgurl": IMAGE_URL}) 
    });
    const data = await res.json();

    return data;

}

//This function gets the image and calculates the box boundaries with respect to where the image is in on the webpage
calculateBox = (box) => {
  //console.log(box);
  const imgDom = document.getElementById("imgSrc");
  const width = imgDom.width;
  const height = imgDom.height;

  return (
    {
      topRow: box.top_row*height,
      leftCol: box.left_col*width,
      botRow: height - (box.bottom_row*height),
      rightCol: width - (box.right_col*width)
    }
  )

}

//This function changes updates user object with the current logged in user. Used in the Signin and Register pages
loadUser = (userData) => {
  this.setState({ user : {
      id:userData.id,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    }
  })  
//console.log(this.state.user)
};


//The function changes the input variable to whatever is in the user input box
onChangeInput = (event) =>{
  this.setState({input:event.target.value})

};

//This is triggered when someone submits the button. 

onClickButton = async (event) => {
  //console.log(event.target.value)
  //"a403429f2ddf4b49b307e318f00e528b"

//It updates the imgURL with whatever is in the input.
  this.setState({imgUrl: this.state.input})
  //const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

  //Retrives the box points from Clarifai Api
  const boxPercent = await this.apiData(this.state.input)
  //console.log(this.state.input)


  //const boxPercent = await boxRes.json(); 

  //If the carifai api returned data, we use that data and caculate the box boundaries of the face. See calculatebox function for more info
  //After the calculation set the Box data using setBox function and update the entries data in backend and frontend
  if (boxPercent) {
    this.setBox(this.calculateBox(boxPercent))
    // const res = await fetch("http://localhost:3001/image", {
    const res = await fetch("https://appserver-xdco.onrender.com/image",{
      method: "PUT",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({id: this.state.user.id}) //we send the id of the user to search the database
    });
    const userData = await res.json();// get back the entry
    //console.log(userData)
    this.setState(Object.assign(this.state.user, {entries: userData})) //update the state to reflect the new update
  }
  

};

//Updates the page depending if the user is signed in our not
routeChange = (route) => {
  //console.log(route === "home")
  if (route === "signin") {
    this.setState({isSignedIn: false});
    //Due to previous user still staying in the state resulting in old picture showing up. This is a way to clear and reset it.
    this.setState({box: {}});
    this.setState({imgUrl: ''});
    this.setState({input: ''});
    //console.log(this.state.isSignedIn)   
  } else if (route ==="home") {
      this.setState({isSignedIn: true}); 
      //console.log("hi")
  }

  this.setState({route:route})
    //console.log(this.state.route)

};

setBox = (box) => {
  this.setState({box: box})
  console.log(this.state.box)

};


  render() {
    //console.log(this.state)

    return(
      
        <div>
        {/*} This is to add some flair to the website (Need to make sure it works) */}
          <ParticlesBg className="particles" type="cobweb" bg={true} /> 
        {/* The navbar component changes based on if the user is logged in or not. */}
          <Navigation routeChange={this.routeChange} isSignedIn = {this.state.isSignedIn}/> 
        { this.state.route === "home" 
          ? <div>
            <Logo />
            <Rank username= {this.state.user.username} entries= {this.state.user.entries} /> 
            <ImageForm onChangeInput = {this.onChangeInput} onClickButton = {this.onClickButton}/>
            <FaceRecog box= {this.state.box} imgUrl={this.state.imgUrl}/>  
          </div>
          :this.state.route==="register"
          ? <Register loadUser = {this.loadUser} routeChange={this.routeChange} />
          : <SignIn loadUser = {this.loadUser} routeChange={this.routeChange} /> 
        }
          
        </div>
    );
    
  };
}

export default App;
