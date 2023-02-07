
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


apiData = async (IMAGE_URL) => {
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));

    const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions) 
    const data = await response.json();
    const box = data.outputs[0].data.regions[0].region_info.bounding_box;
    //console.log(box)
    return box


};




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

onChangeInput = (event) =>{
  this.setState({input:event.target.value})

};

onClickButton = async (event) => {
  //console.log(event.target.value)
  //"a403429f2ddf4b49b307e318f00e528b"

  this.setState({imgUrl: this.state.input})
  //const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';
  const boxPercent = await this.apiData(this.state.input)
  if (boxPercent) {
    this.setBox(this.calculateBox(boxPercent))
    const res = await fetch("http://localhost:3001/image", {
      method: "PUT",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({id: this.state.user.id})
    });
    const userData = await res.json();
    console.log(userData)
    this.setState(Object.assign(this.state.user, {entries: userData}))
  }
  

};

routeChange = (route) => {
  //console.log(route === "home")
  if (route === "signin") {
    this.setState({isSignedIn: false});
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
    console.log(this.state)

    return(
      
        <div>
          <ParticlesBg className="particles" type="circle" bg={true} />
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
