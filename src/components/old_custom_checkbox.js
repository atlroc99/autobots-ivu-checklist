import React from "react";
import { Form } from "react-bootstrap";
import EditableLabel from "react-editable-label";

const CustomCheckbox = (props) => {
    // console.log('inside CustomCheckox: isAdmin:', props.isAdmin);
    console.log('CustomCheckbox PROPS', props);
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value={props.isChecked} id={props.key} checked={props.isChecked}/>
            <label className="form-check-label" for={props.key} />
        </div>




        // <Form.Check type='checkbox' id={props.id} >
            {/* <Form.Check.Input
                key={props.id}
                id={props.id}
                name={props.name}
                checked={props.isChecked}
                onChange={props.handleChange}
                disabled={props.isAdmin || props.dealer.isCompleted} 
                />
             {
                props.isAdmin ? <EditableLabel initialValue={props.label}
                    save={value => props.handleOnChangeLabel(value, props.name, props.id)} /> :
                    <Form.Label> {props.label} </Form.Label>
            }  */}

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