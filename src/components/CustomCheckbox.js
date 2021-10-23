import React from "react";
import { Form } from "react-bootstrap";

const CustomCheckbox = (props) => {
    console.log('inside CustomCheckox: isAdmin:', props.isAdmin);
    console.log('PROPS', props);
    return (
        <Form.Check type='checkbox' id={props.id} >
            <Form.Check.Input
                type='checkbox'
                key={props.id}
                name={props.name}
                value={props.isChecked}
                checked={props.isChecked}
                onChange={props.onChange}
                disabled={props.isAdmin || props.dealer.isCompleted} />
            <Form.Label
                contentEditable={props.isAdmin}
                value={props.label}
                onChange={e => props.handleOnChangeLabel}>{props.label}</Form.Label>
        </Form.Check>


        // key={props.id}
        // type="checkbox"
        // disabled={props.disableCheckBoxes}
        // name={props.name}
        // value={props.isChecked}
        // checked={props.isChecked}
        // onChange={props.onChange}
        // label={props.label} />
        // onChange={() => setITSecurityDocReviewedAndApproved(!iTSecurityDocReviewedAndApproved)}
    )
}

export default CustomCheckbox;