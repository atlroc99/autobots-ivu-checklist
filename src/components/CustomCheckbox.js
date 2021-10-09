import React from "react";
import { Form } from "react-bootstrap";

const CustomCheckbox = (props) => {
    return (
        <Form.Check
            key={props.id}
            type="checkbox"
            name={props.name}
            value={props.isChecked}
            checked={props.isChecked}
            onChange={props.onChange}
            label={props.label} />
        // onChange={() => setITSecurityDocReviewedAndApproved(!iTSecurityDocReviewedAndApproved)}
    )
}

export default CustomCheckbox;