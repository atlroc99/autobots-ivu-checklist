import React from 'react';
import Header from './Header';
import Footer from './Footer';

 const Layout = ({children}) => {
     console.log('inside Layout, Children: ', children)
     console.log('inside Layout, children.props: ', children.props.children.props.children.props)
     console.log('inside Layout, key: ', children.props.children.props.children.props.key)
     
     
     const getData = (val) => {
         console.log('getData:', val)
     }

    return (
        <div  style={{background:'white'}}>
            <Header test="someData"/>
                {children}
            <Footer/>
        </div>
    )
}
export default Layout;