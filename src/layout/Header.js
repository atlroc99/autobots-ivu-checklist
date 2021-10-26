import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../image/MicrosoftTeams-image.png';

const Header = ({onClick}) => {
  return (
    <div>
    {/**<Navbar bg="white" fixed="top" expand="lg"> */}
     <Navbar bg="white" expand="lg">
         <Navbar.Brand href="/">
          <img className="logo"
            src={logo}
            alt="logo"
            style={headerStyle}>
          </img>
        </Navbar.Brand> 
      </Navbar>
    </div>
  )
}

const headerStyle = {
  marginTop:'50px',
  marginLeft: '200px',
  maxWidth: '500px',
  maxheight: '150px'
}

export default Header


