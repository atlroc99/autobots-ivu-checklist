import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function LiteModal({ title, body, show, handleClose, onClick, buttonValue_1, buttonValue_2 }) {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    {buttonValue_1 ? <Button variant="danger" onClick={onClick}>{buttonValue_1}</Button> : ''}
                    {buttonValue_2 ? <Button variant="secondary" onClick={handleClose}>{buttonValue_2}</Button>: ''}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default LiteModal;