import React from 'react';
import IvuChecklist from './components/IvuChecklist'
import Layout from './layout/Layout';
import './app.css';


function Main() {
  return (
    <div>
     <Layout>
        <IvuChecklist/>
     </Layout>
    </div>
  )
}

export default Main
