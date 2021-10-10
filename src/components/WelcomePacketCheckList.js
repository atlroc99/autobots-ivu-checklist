import React, { Component } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import LiteModal from './LiteModal';
import CustomCheckbox from './CustomCheckbox'

const url = 'http://localhost:8000';

class WelcomePacketCheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkListSubmitted: false, // hide the buttons if true
            customerId: '',
            showCustomerId: false,
            items: [],
            showModal: false,
            modalTitle: '',
            modalBody: '',
            disableCheckBoxes: false,
            isUpdaing: false,
            buttonValue_1: '',
            buttonValue_2: ''
        };
    }

    isComplete = false;
    async componentDidMount() {
        const checklist = await axios.get(url + '/checklist/items')
        this.setState({ items: checklist.data });
    }

    showModal(modalAttr) {
        console.log('show modal')
        const { modalTitle, modalBody, showModal, button1Value, button2Value } = modalAttr;
        this.setState({ modalTitle: modalTitle });
        this.setState({ modalBody: modalBody });
        this.setState({ buttonValue_1: button1Value })
        this.setState({ buttonValue_2: button2Value })
        this.setState({ showModal: showModal });
    }

    async searchCustomer(customerId, event) {
        console.log('customer ID searching...:', customerId);
        const response = await axios.get(`${url}/${customerId}`)
        
        console.log('res', response, )
        console.log('# keys', Object.keys(response.data).length );

        if (typeof(response) === 'undefined' || Object.keys(response.data).length === 0) {
            this.showModal({
                modalTitle: 'Record Not Found',
                modalBody: `No record found for customer: ${this.state.customerId}`,
                showModal: true,
                button1Value: 'Ok'
            }) ;
        }
        
        const items = JSON.parse(response.data.checklistsObject)
        if (items.length > 1) {
            this.setState({ customerId: customerId });
            this.setState({ showCustomerId: true })
        }

        this.setState({ items: items })
        this.setState({ checkListSubmitted: this.isSubmited(this.state.items) })

        // disable checklist if forms already submitted before
        if (this.state.checkListSubmitted) {
            this.setState({ disableCheckBoxes: true });
        }
        console.log('checklist-submitted', this.checkListSubmitted);

        event.target.reset();
    }

    handleChange = (event) => {
        let items = this.state.items;

        items.forEach(item => {
            if (item.name === event.target.name) {
                item.isChecked = event.target.checked;
            }
        });
        this.setState({ items: items });
        this.isComplete = this.state.items.every(i => i.isChecked === true);
    }

    update = async (e) => {
        e.preventDefault();
        const customerId = this.state.customerId ? this.state.customerId : 'NIL';
        const response = await axios.put(`${url}/${customerId}`, this.state.items);
        this.showModal({
            modalTitle: `CusotmerID: ${response.data.id}`,
            modalBody: `Updated CusotmerID: ${response.data.id}`,
            button1Value: 'Ok',
            button2Value: '',
            showModal: true
        });
    }


    submit = async (e) => {
        e.preventDefault();
        console.log('submtting data for: ', this.state.customerId);
        this.showModal({
            modalTitle: `'Submitting data for ${this.state.customerId}`,
            modalBody: 'Are you sure? Once Submitted, you will not be able to update the data',
            showModal: true,
            button1Value: 'Yes',
            button2Value: 'No',
        }
        )
    }

    handleCloseModal = () => {
        console.log('Modal Closed')
        this.setState({ showModal: false });
        this.setState({ modalTitle: '' });
        this.setState({ modalBody: '' });
    }

    handleAcceptModalInfo = async (event) => {
        console.log('Message Acknowledged ...submitted form')
        this.setState({ checkListSubmitted: true });
        const response = await axios.put(`${url}/${this.state.customerId}`, this.state.items);
        this.setState({ showModal: false })
        console.log('response', response);
        window.location.reload();
    }


    lookupCustomerData = (event) => {
        event.preventDefault();
        console.log('value: ', this.state.customerId);
        const response = this.searchCustomer(this.state.customerId, event)
        event.preventDefault();
    }

    isSubmited(data) {
        return data.every(item => item.isChecked === true);
    }
    render() {
        return (
            <div>
                <h5>Class Component</h5>
                <form className="searchForm" onSubmit={this.lookupCustomerData}>
                    <label>Enter customer id
                        {/* <input style={{ marginLeft: '10px' }} type='text' value={this.customerId} onChange={e => setcustomerId(e.target.value)} /> */}
                        <input className="searchFormInput" type='text' value={this.state.customerId} onChange={(e) => this.setState({ customerId: e.target.value })} />
                    </label>
                    <Button type="submit" variant='primary' style={{ marginLeft: '50px' }}>Search</Button>
                </form>
                <div className="checklistBox">
                    <fieldset>
                        <Form className="p-4">
                            {
                                this.state.showCustomerId ?
                                    <p>
                                        <span style={{ backgroundColor: 'yellow', color: 'black' }}><strong>Customer ID:</strong> {this.state.customerId}</span>
                                    </p> : null
                            }

                            <div className="title"><i className="fas fa-list-alt"></i>  Welcome Packet Checklist - Beta(iVu)</div>
                            {
                                this.state.items.map((item, idx) => {
                                    return (
                                        <Form.Group key={idx}>
                                            <CustomCheckbox onChange={this.handleChange} disableCheckBoxes={this.state.disableCheckBoxes} {...item} />
                                        </Form.Group>
                                    )
                                })
                            }
                            <div>
                                {
                                    !this.state.checkListSubmitted ?
                                        <div style={{ marginLeft: '40%' }}>
                                            <Button type="submit"
                                                value='Update'
                                                onClick={this.update}
                                                variant="outline-primary"
                                                disabled={this.isComplete}
                                                style={{ width: '200px', margin: '5px' }}>
                                                <span style={{ marginRight: '15px' }}>Update</span>
                                                <i className="fas fa-sync-alt" />
                                            </Button>
                                            <Button
                                                type="submit"
                                                onClick={this.submit}
                                                variant="danger"
                                                disabled={!this.isComplete}
                                                style={{ width: '200px', margin: '5px' }}>
                                                <span style={{ marginRight: '15px' }}>Submit</span>
                                                <i className="fas fa-save" />
                                            </Button>
                                            <LiteModal
                                                title={this.state.modalTitle}
                                                body={this.state.modalBody}
                                                show={this.state.showModal}
                                                handleClose={this.handleCloseModal}
                                                onClick={this.handleAcceptModalInfo}
                                                buttonValue_1={this.state.buttonValue_1}
                                                buttonValue_2={this.state.buttonValue_2}
                                            />

                                        </div> : <p></p>
                                }
                                {console.log('isModealshow:', this.state.showModal)}
                            </div>
                        </Form>
                    </fieldset>
                </div>
            </div>
        )
    }
}

export default WelcomePacketCheckList;