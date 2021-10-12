import React, { Component } from "react";
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';
import LiteModal from './LiteModal';
import CustomCheckbox from './CustomCheckbox';
import ButtonTest from "./ButtonTest";

// const url = 'http://localhost:8000';
const url = 'http://localhost:3000/checklists';

class WelcomePacketCheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkListSubmitted: false, // hide the buttons if true
            dealershipName: '',
            showdealershipName: false,
            items: [],
            showModal: false,
            isComplete: false,
            isUpdating: false,
            isSubmitting: false,
            modalTitle: '',
            modalBody: '',
            disableCheckBoxes: false,
            isUpdaing: false,
            buttonValue_1: '',
            buttonValue_2: '',
        };
    }

    // isComplete = false;
    async componentDidMount() {
        // node: const checklist = await axios.get(url + '/checklist/items')
        // node: this.setState({ items: paresed_checklist.data });
        const response = await axios.get(url + '/dealer-checklist')
        this.setState({ items: response.data.results.checklist });
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

    async searchCustomer(dealershipName, event) {
        console.log('customer ID searching...:', dealershipName);
        const response = await axios.get(`${url}/dealership/${dealershipName}`)
        console.log('res', response,)

        const dealersChecklist = response.data.results.dealersChecklist
        console.log('# keys', Object.keys(dealersChecklist).length);

        if (typeof (dealersChecklist) === 'undefined' || Object.keys(dealersChecklist).length === 0) {
            this.showModal({
                modalTitle: 'Record Not Found',
                modalBody: `No record found for customer: ${this.state.dealershipName}`,
                showModal: true,
                button1Value: 'Ok'
            });
        }

        if (dealersChecklist.length > 1) {
            this.setState({ dealershipName: dealershipName });
            this.setState({ showdealershipName: true })
        }

        this.setState({ items: dealersChecklist })
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
        // this.isComplete = this.state.items.every(i => i.isChecked === true);
        console.log('all checked: ', this.state.items.every(i => i.isChecked === true));
        this.setState({ isComplete: this.state.items.every(i => i.isChecked === true) })
    }

    update = async (e) => {
        e.preventDefault();
        const dealershipName = this.state.dealershipName ? this.state.dealershipName : 'NIL';
        const body = JSON.stringify({ "dealersChecklist": this.state.items });
        console.log('updating: ', body);
        this.setState({ isUpdaing: true })
        const response = await axios.put(`${url}/${dealershipName}`, body);
        console.log('response,', response.data)
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
        console.log('submtting data for: ', this.state.dealershipName);
        this.setState({ isSubmitting: true });
        this.showModal({
            modalTitle: `'Submitting data for ${this.state.dealershipName}`,
            modalBody: 'Are you sure? Once Submitted, you will not be able to update the data',
            showModal: true,
            button1Value: 'Yes',
            button2Value: 'No',
        })
    }

    handleCloseModal = () => {
        console.log('Modal Closed')
        this.setState({ showModal: false });
        this.setState({ modalTitle: '' });
        this.setState({ modalBody: '' });
    }

    handleAcceptDataSubmission = async (event) => {
        console.log('Message Acknowledged ...submitted form')
        this.setState({ checkListSubmitted: true });
        console.log('submitting data: ', this.state.items);
        const requestBody = JSON.stringify({
            'dealershipName': this.state.dealershipName,
            'dealersChecklist': this.state.items
        });
        const response = await axios.post(`${url}/${this.state.dealershipName}/submit`, requestBody);
        this.setState({ showModal: false })
        console.log('response', response);
        this.setState({disableCheckBoxes: true});

        // window.location.reload();
    }

    lookupCustomerData = (event) => {
        event.preventDefault();
        console.log('value: ', this.state.dealershipName);
        const response = this.searchCustomer(this.state.dealershipName, event)
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
                        {/* <input style={{ marginLeft: '10px' }} type='text' value={this.dealershipName} onChange={e => setdealershipName(e.target.value)} /> */}
                        <input className="searchFormInput" type='text' value={this.state.dealershipName} onChange={(e) => this.setState({ dealershipName: e.target.value })} />
                    </label>
                    <Button type="submit" variant='primary' style={{ marginLeft: '50px' }}>Search</Button>
                </form>
                <div className="checklistBox">
                    <fieldset>
                        <Form className="p-4">
                            {
                                this.state.showdealershipName ?
                                // style={{ backgroundColor: 'yellow', color: 'black' }}
                                    <p>
                                        <span><strong>Customer ID:</strong> {this.state.dealershipName}</span>
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
                                                disabled={this.state.isComplete}
                                                style={{ width: '200px', margin: '5px' }}>
                                                    <span style={{ marginRight: '15px' }}>Update</span>
                                                    <i className="fas fa-sync-alt" />
                                            </Button>
                                            <Button type="submit"
                                                onClick={this.submit}
                                                variant="danger"
                                                disabled={!this.state.isComplete}
                                                style={{ width: '200px', margin: '5px' }}>
                                                    <span style={{ marginRight: '15px' }}>Submit</span>
                                                    <i className="fas fa-sync-alt" />
                                            </Button>

                                            <LiteModal
                                                title={this.state.modalTitle}
                                                body={this.state.modalBody}
                                                show={this.state.showModal}
                                                handleClose={this.handleCloseModal}
                                                onClick={this.state.isUpdaing ? this.handleCloseModal : this.handleAcceptDataSubmission}
                                                buttonValue_1={this.state.buttonValue_1}
                                                buttonValue_2={this.state.buttonValue_2}
                                            />
                                        </div> : <p></p>
                                }
                            </div>
                        </Form>
                    </fieldset>
                </div>
            </div>
        )
    }
}

export default WelcomePacketCheckList;