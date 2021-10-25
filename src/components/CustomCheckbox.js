import React from "react";
import { Form, Button, Row } from "react-bootstrap";

const CustomCheckbox = (props) => {
    // console.log('CustomCheckbox PROPS', props);
    const currentItem = {
        'name': props.name,
        'id': props.id,
        'label': props.label
    }

    return (
        <Form as={Row}>
            <Form.Check
                column sm="6"
                type='checkbox'
                id={props.id}
                name={props.name}
                checked={props.isChecked}
                // disabled={props.isAdmin}
                onChange={props.onChange}
                label={props.label}>
            </Form.Check >
            {//edit and delete label
                props.isAdmin ?
                    <Form.Check column="4">
                        <Button className="btn-sm"
                            onClick={() => props.editLabel(currentItem)} >
                            <i className="fas fa-pencil-alt"></i>
                        </Button>
                        <Button className="btn-sm" style={buttonStyle}
                            onClick={() => props.removeLabel(currentItem)} >
                            <i class="fas fa-trash-alt"></i>
                        </Button>
                    </Form.Check>
                    : null
            }
        </Form >
    )
}

const buttonStyle = {
    paddingLeft: '10px'
}

export default CustomCheckbox;