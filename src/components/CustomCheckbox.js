import React from "react";
import { Form } from "react-bootstrap";
import EditableLabel from "react-editable-label";

const CustomCheckbox = (props) => {
    // console.log('inside CustomCheckox: isAdmin:', props.isAdmin);
    console.log('CustomCheckbox PROPS', props);
    return (
        <Form.Check type='checkbox' id={props.id} >
            <Form.Check.Input
                type='checkbox'
                key={props.id}
                id={props.id}
                name={props.name}
                value={props.isChecked}
                checked={props.isChecked}
                onChange={props.handleChange}
                disabled={props.isAdmin || props.dealer.isCompleted} />
            <EditableLabel
                initialValue={props.label}
                // save= {value=> props.handleOnChangeLabel(value, this)}
                save= {value=> props.handleOnChangeLabel(value, props.name, props.id)}
            />
            {/* <label for={props.id}
                contentEditable={props.isAdmin}
                value={props.label}
                onChange={props.handleOnChangeLabel}>
                {props.label}
            </label> */}
            {/* <Form.Label
                contentEditable={props.isAdmin}
                value={props.label}
                onChange={(e)=>props.handleOnChangeLabel(e)}>{props.label}
            </Form.Label> */}
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