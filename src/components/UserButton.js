import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserButton = (props) => {
    // console.log('Inside UserButton isAdmin:', props.isAdmin)
    // console.log('props.isAllChecked :', props.isAllChecked)
    return (
        //how update and submit buttons if the user is not admin and from hasn't been submitted
        <div style={{ marginLeft: '40%' }}>
            <Button type="submit"
                value='Update'
                onClick={props.update}
                variant="outline-primary"
                disabled={props.isAllChecked} // if all checked disable update
                style={{ width: '200px', margin: '5px' }}>
                <span style={{ marginRight: '15px' }}>Update</span>
                <i className="fas fa-sync-alt" />
            </Button>
            <Button type="submit"
                onClick={props.submit}
                variant="danger"
                disabled={!props.isAllChecked} // if all checked enable update
                style={{ width: '200px', margin: '5px' }}>
                <span style={{ marginRight: '15px' }}>Submit</span>
                <i className="fas fa-sync-alt" />
            </Button>
        </div>
    )


}

export default UserButton;