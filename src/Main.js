import React, { useState } from 'react';
// import IvuChecklist from './components/IvuChecklist'
import Layout from './layout/Layout';
import './app.css';
import WelcomePacketCheckList from './components/WelcomePacketCheckList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <div className="container">
      {/* <Layout> */}
      <BrowserRouter>
        <Switch>
          <Route exact path='/checklist/:dealership' component={WelcomePacketCheckList}/>
        </Switch>
      </BrowserRouter>

      {/* </Layout> */}

      {/* {
        isSending ?
          <Layout>
            <IvuChecklist isSending={isSending} />
          </Layout>
          :
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
      } */}
    </div>

  )
}

export default App
