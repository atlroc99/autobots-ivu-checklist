import React, { Component } from "react";
import { Button } from 'react-bootstrap';

const AdminButton = (props) => {
    console.log("inside admin button: isAdmin: ", props.isAdmin)
    return (
        <div>
            <div className="row">
                <div className="col col-md">
                    <Button type="submit"
                        onClick='this.cance;'
                        variant="primary"
                        // disabled={!this.state.isComplete}
                        style={{ width: '200px', margin: '5px' }}>
                        <span style={{ marginRight: '15px' }}>Cancel</span>
                        <i className="fas fa-sync-alt" />
                    </Button>
                </div>
                <div className="col col-md">
                    <Button type="submit"
                        onClick='this.save'
                        variant="danger"
                        // disabled={!this.state.isComplete}
                        style={{ width: '200px', margin: '5px' }}>
                        <span style={{ marginRight: '15px' }}>Save</span>
                        <i className="fas fa-sync-alt" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AdminButton;

