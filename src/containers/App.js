
import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageForm from '../components/ImageForm/ImageForm';
import FaceRecog from '../components/FaceRecog/FaceRecog';
import Rank from '../components/Rank/Rank';
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
      box:{}

    }
  }

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


}  

calculateBox = (box) => {
  console.log(box);
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

onChangeInput = (event) =>{
  this.setState({input:event.target.value})

}

onClickButton = async (event) => {
  //console.log(event.target.value)
  //"a403429f2ddf4b49b307e318f00e528b"

  this.setState({imgUrl: this.state.input})
  //const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';
  const boxPercent = await this.apiData(this.state.input)
  this.setBox(this.calculateBox(boxPercent))
  


}

setBox = (box) => {
  this.setState({box: box})
  console.log(this.state.box)

}


  render() {
    return(
      <>
        <ParticlesBg className="particles" type="circle" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageForm onChangeInput = {this.onChangeInput} onClickButton = {this.onClickButton}/>
        <FaceRecog box= {this.state.box} imgUrl={this.state.imgUrl}/>


      </>
    )
  };
}

export default App;
