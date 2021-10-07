import React from 'react';
import { Navbar } from 'react-bootstrap';
// import logo from '../image/AutomatedLogic_logo.jpeg';

const Header = ({onClick}) => {
  return (
    <div>
      {/* <Navbar bg="white" fixed="top" expand="lg">
         <Navbar.Brand href="/">
          <img className="logo"
            src={logo}
            alt="logo"
            style={headerStyle}>
          </img>
        </Navbar.Brand> 
      </Navbar> */}
    </div>
  )
}

const headerStyle = {
  marginLeft: '450px',
  minWidth: '600px',
  height: '150px'
}

export default Header


