import React, { useState } from 'react';
// import IvuChecklist from './components/IvuChecklist'
import Layout from './layout/Layout';
import './app.css';
import WelcomePacketCheckList from './components/WelcomePacketCheckList';

function App() {

  return (
    <div>
      <Layout>
        <WelcomePacketCheckList/>
      </Layout>

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
