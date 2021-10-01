import React from 'react';
import {Navbar} from 'react-bootstrap';
import logo from '../image/AutomatedLogic_logo.jpeg';

const Header = () => {
  return (
    <Navbar bg="white"  fixed="top" expand="lg">
    <Navbar.Brand href="/"><img className="logo"  src={logo} alt="logo" style={{marginLeft: '450px', minWidth: '600px', height:'100px'}}></img></Navbar.Brand>
    </Navbar>
  )
}
export default Header


