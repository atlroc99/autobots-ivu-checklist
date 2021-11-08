import React, { useState } from 'react';
import Layout from './layout/Layout';
import Header from './layout/Header';
import './app.css';
import WelcomePacketCheckList from './components/WelcomePacketCheckList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './layout/Footer';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig)

function App() {
  const [systemName, setSystemName] = useState('systemName-ivu');
  return (
    <div className="container" style={{ background: 'white' }}>
      <Header test="someData" systemName={systemName}>
        <AmplifySignOut />
      </Header>
      <BrowserRouter>
        <Switch>
          {/* the WelcomePacketCheckList (child of this component) needs to call callme and pass systemName */}
          {/* <Route exact path='/checklist/:dealership' render={(props) => <WelcomePacketCheckList {...props.match.params} */}
          <Route exact path='/checklist/:dealerId' render={(props) => <WelcomePacketCheckList {...props.match.params}
            callme={(sysName) => setSystemName(sysName)} />} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  )
  // return (
  //   <div className="container">
  //     <Layout>
  //       <BrowserRouter>
  //         <Switch>
  //           {/* <Route exact path='/checklist/:dealership' component={WelcomePacketCheckList}/> */}
  //           {/* <Route exact path='/checklist/:dealership' render={(props)=> <WelcomePacketCheckList globalStore={globalStore} {...props}/>}/> */}
  //           <Route key={systemName} exact path='/checklist/:dealership'  render={(props) => <WelcomePacketCheckList {...props.match.params} callme={callMe} val={systemName}/>} />
  //         </Switch>
  //       </BrowserRouter>
  //     </Layout>
  //   </div>
  // )
}

export default withAuthenticator(App);
