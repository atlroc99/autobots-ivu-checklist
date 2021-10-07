import React from "react";
// import { Button } from "react-bootstrap";
import { MDBCol, MDBFormInline, MDBIcon, MDBBtn } from "mdbreact";
// import { MDBCol, MDBFormInline, MDBBtn } from 'mdbreact';

const SearchBox = ({onClick}) => {
    return (
        <MDBCol md="6">
            <MDBFormInline className="md-form">
                <MDBIcon icon="search" />
                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
                <MDBBtn gradient="aqua" rounded size="sm" type="submit"  onClick={onClick}>Search</MDBBtn>
            </MDBFormInline>
        </MDBCol>
    );
}
// const SearchBox = ({onClick}) => {
//     return (
//         <MDBCol md="12">
//             <MDBFormInline className="md-form mr-auto mb-4">
//                 <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
//                 <Button gradient="aqua" rounded size="sm" type="submit"  onClick={onClick}>
//                     Search
//                 </Button>
//             </MDBFormInline>
//         </MDBCol>
//     );
// }


export default SearchBox;