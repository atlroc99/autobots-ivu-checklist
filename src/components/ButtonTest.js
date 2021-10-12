import React, { Component } from "react";
import { Button, Spinner } from "react-bootstrap";
    const ButtonTest = (props) => {
        console.log('isSubmitting', props.isSubmitting)
        
        let button;

        if (props.isSubmitting) {
            button = <Button
                type="submit"
                onClick={props.submit}
                variant="danger"
                disabled={!props.isComplete}
                style={{ width: '200px', margin: '5px' }}> 
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Saving...
            </Button>
        } else {
            button = <Button
                type="submit"
                onClick={props.submit}
                variant="danger"
                disabled={!props.isComplete}
                style={{ width: '200px', margin: '5px' }}>
                <span style={{ marginRight: '15px' }}>Submit</span>
                <i className="fas fa-sync-alt" />
            </Button>
        }

        return (
            <div>
                {button}
            </div>
        )
    }

export default ButtonTest;