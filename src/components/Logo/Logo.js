import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';                                                                      

const Logo = () => {
  return (
  	<div className = "mt0 ma4 logo grow">
      <Tilt className="br2 shadow-2">
          <img alt = "logo" src={brain} />
      </Tilt>
    </div>
  );
};
export default Logo