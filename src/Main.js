import React, { useState } from 'react';
import IvuChecklist from './components/IvuChecklist'
import Layout from './layout/Layout';
import './app.css';
// import { Spinner } from 'react-bootstrap';


function App() {

  const [sending, isSending] = useState(false)
  console.log('isSending', sending)

  return (
    <div>
      <Layout>
        <IvuChecklist isSending={isSending} />
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
