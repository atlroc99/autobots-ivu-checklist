import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function LiteModal({ title, body, show, handleClose, onClick, buttonValue_1, buttonValue_2 }) {
    console.log('...opening modal')
    const isBodyEmpty = typeof body === 'undefined' 
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* if the body is empty /undefined then show warning message */}
                    {!isBodyEmpty ? body : 
                    <span className='text-warning'>!! Warning: Missing modal body {isBodyEmpty}!!</span>}
                </Modal.Body>
                <Modal.Footer>
                    {/* if the modal body is empty / undefined or empty disable the buttons */}
                    {buttonValue_1 ? <Button disabled={isBodyEmpty} variant="danger" onClick={onClick}>{buttonValue_1}</Button> : ''}
                    {buttonValue_2 ? <Button disabled={isBodyEmpty} variant="secondary" onClick={handleClose}>{buttonValue_2}</Button> : ''}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default LiteModal;