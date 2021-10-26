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
            <tr style={{ marginLeft: '10px' }}>
                <td style={{ width: "800px" }}>
                    <Form.Check
                        column sm="6"
                        type='checkbox'
                        id={props.id}
                        name={props.name}
                        checked={props.isChecked}
                        onChange={props.onChange}
                        label={props.label}
                        // disabled={props.isAdmin}
                        disabled={props.disableCheckBoxes}
                    >
                    </Form.Check >
                </td>
                <td>
                    {//edit and delete label
                        props.isAdmin ?
                            <Form.Check column="4" style={{marginLeft:'150px', padding:'10px'}}>
                                <Button
                                    onClick={() => props.editLabel(currentItem)} >
                                    <i className="fas fa-pencil-alt"></i>
                                </Button>{' '}
                                <Button className="btn btn-danger"
                                    onClick={() => props.removeLabel(currentItem)} >
                                    <i class="fas fa-trash-alt"></i>
                                </Button>
                            </Form.Check>
                            : null
                    }
                </td>
            </tr>
        </Form >
    )
}

const buttonStyle = {
    marginLeft: '30px'
}

export default CustomCheckbox;