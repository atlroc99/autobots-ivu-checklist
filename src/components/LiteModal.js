import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';

function LiteModal({ title, body, show, handleClose, onClick, chooseMigrationDate, buttonValue_1, buttonValue_2, isSubmitting }) {
    const isBodyEmpty = typeof body === 'undefined'
    const [date, setDate] = useState(new Date);
    // console.log('LiteModal issubmitting', isSubmitting);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* if the body is empty /undefined then show warning message */}
                    {!isBodyEmpty ? body :
                        <span className='text-warning'>!! Warning: Missing modal body {isBodyEmpty}!!</span>
                    }
                    {
                        isSubmitting ? 
                        <Calendar onChange={(pew) => {chooseMigrationDate(pew)}}
                        // onChange={(e) => chooseMigrationDate(e.target.value)}
                        minDate={new Date()}/>
                        : null

                    }
                    
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