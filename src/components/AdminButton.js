import React, { Component } from "react";
import { Button, ButtonGroup } from 'react-bootstrap';

const AdminButton = (props) => {
    // console.log("inside admin button: isAdmin: ", props.isAdmin)
    // console.log("PROPS: ", props)
    return (
        <div>
            <div className="row">
                <div className="col col-md">
                    <Button
                        variant="primary"
                        onClick={()=> props.isShowAddLabelModal(true)}
                        style={{ width: '110px', margin: '5px' }}>
                        <span style={{ marginRight: '15px' }}>Add</span>
                        <i class="fas fa-plus-circle"></i>
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="col col-md">
                    <Button type="submit"
                        onClick={props.cancelChanges}
                        variant="primary"
                        // disabled={!this.state.isComplete}
                        style={{ width: '110px', margin: '5px' }}>
                        <span style={{ marginRight: '15px' }}>Cancel</span>
                        <i className="fas fa-sync-alt" />
                    </Button>
                </div>
                <div className="col col-md">
                    <Button type="submit"
                        onClick={props.saveChanges}
                        variant="danger"
                        // disabled={!this.state.isComplete}
                        style={{ width: '100px', margin: '5px', marginLeft:'430px'}}>
                        <span style={{ marginRight: '15px' }}>Save</span>
                        <i className="fas fa-sync-alt" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AdminButton;

