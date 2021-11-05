import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import wcLogo from '../image/WebCTRL_Cloud_(BkT)_Final.png';
import iVuLogo from '../image/i-Vu_Cloud_dark_bg.png';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
// const Header = ({onClick}) => {
const Header = (props) => {
  const [logo, setLogo] = useState('');
  return (
    <div>
      {/**<Navbar bg="white" fixed="top" expand="lg"> */}
      <Navbar bg="white" expand="lg">
      <AmplifySignOut />
        {/* <Navbar.Brand href="/checklists/"> */}
        <Navbar.Brand href="#">
          <img className="logo"
            src={props.systemName === 'iVu' ? iVuLogo : props.systemName === 'webCTRL' ? wcLogo : ''}
            style={headerStyle}>
          </img>
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}

const headerStyle = {
  marginTop: '50px',
  marginLeft: '200px',
  maxWidth: '500px',
  maxheight: '150px'
}

export default Header


