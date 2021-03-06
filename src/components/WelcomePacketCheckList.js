import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import LiteModal from './LiteModal';
import CustomCheckbox from './CustomCheckbox';

// const url = 'http://localhost:8000';
const url = 'http://localhost:3000/checklists';

class WelcomePacketCheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealer: {
                checklists: [],
                dealerName: '',
                accountNumber: '',
                serialNumber: '',
                endCustomerCompany: '',
                isCompleted: false,
                systemName: '',
                uiTheme: ''
            },

            checkListSubmitted: false, // hide the buttons if true
            dealershipName: '',
            endcustomer: '',
            items: [],
            isComplete: false,
            showdealershipName: false,
            showModal: false,
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
        const response = await axios.get(url + `/${this.props.match.params.dealership}`);
        console.log('response', response)
        // const { data } = JSON.parse(response.data);
        const dealer = { ...response.data }
        this.setState({ dealer })
        console.log(this.state.dealer)
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
        const response = await axios.get(`${url}/${dealershipName}`)
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
        // let items = this.state.items;
        let items = this.state.dealer.checklists;

        items.forEach(item => {
            if (item.name === event.target.name) {
                item.isChecked = event.target.checked;
            }
        });

        const dealer = this.state.dealer
        dealer.checklists = items
        this.setState({ dealer })
        this.setState({ isComplete: this.state.items.every(i => i.isChecked === true) })

        console.log('all checked: ', this.state.dealer.checklists.every(i => i.isChecked === true));
        this.setState({ isComplete: this.state.dealer.checklists.every(i => i.isChecked === true) })
    }

    update = async (e) => {
        e.preventDefault();
        const dealershipName = this.state.dealer.dealerName ? this.state.dealer.dealerName : 'NIL';

        const payload = JSON.stringify(this.state.dealer);
        this.setState({ isUpdaing: true })
        console.log('SEND TO BACKEND: ', payload)

        const response = await axios.put(`${url}/${dealershipName}?update=true`, payload);
        console.log('response,', response.data)
        const str_val = JSON.stringify(response.data);
        console.log(str_val)
        const data = JSON.parse(str_val)
        console.log(data.statusCode)

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
        console.log('submtting data for: ', this.state.dealer.dealerName);
        this.setState({ isSubmitting: true });
        this.showModal({
            modalTitle: `'Submitting data for ${this.state.dealer.dealerName}`,
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
        console.log('submitting data: ', this.state.dealer);
        const requestBody = JSON.stringify(this.state.dealer)
        const post_url = `${url}/${this.state.dealer.dealerName}?submit=${true}`;
        console.log('submitting to url: ', post_url)
        const response = await axios.post(post_url, requestBody);
        this.setState({ showModal: false })
        console.log('response', response);
        this.setState({ disableCheckBoxes: true });
        window.location.reload();
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
                <div className="row">
                    <div className="col col-6">
                        <h2>Welcome Packet checklist</h2>
                        <h5>{this.state.dealer.dealerName}</h5>
                    </div>
                    <div className="col col-6">
                        <h5 style={{ float: 'right', marginTop: '20px', marginRight: '70px' }}>{this.state.dealer.endCustomerCompany}</h5>
                    </div>
                </div>
                <hr />

                <form className="searchForm" onSubmit={this.lookupCustomerData}>
                    {/* <label>Enter customer id */}
                    {/* <input style={{ marginLeft: '10px' }} type='text' value={this.dealershipName} onChange={e => setdealershipName(e.target.value)} /> */}
                    {/* <input className="searchFormInput" type='text' value={this.state.dealer.dealerName} onChange={(e) => this.setState({ dealershipName: e.target.value })} /> */}
                    {/* <input className="searchFormInput" type='text' value={this.state.dealer.dealerName} onChange={(e) => this.setState({ dealerName: e.target.value })} /> */}
                    {/* </label> */}
                    {/* <Button type="submit" variant='primary' style={{ marginLeft: '50px' }}>Search</Button> */}
                </form>

                <div className="checklistBox">
                    <fieldset>
                        <Form className="p-4">
                            {
                                this.state.showdealershipName ?
                                    // style={{ backgroundColor: 'yellow', color: 'black' }}
                                    <p>
                                        <span><strong>Customer ID:</strong> {this.state.dealer.dealerName}</span>
                                    </p> : null
                            }

                            <div className="title"><i className="fas fa-list-alt"></i>  Welcome Packet Checklist - Beta(iVu)</div>
                            {
                                this.state.dealer.checklists.map((item, idx) => {
                                    return (
                                        <Form.Group key={idx}>
                                            <CustomCheckbox onChange={this.handleChange} disableCheckBoxes={this.state.dealer.isCompleted} {...item} />
                                        </Form.Group>
                                    )
                                })
                            }
                            <div>
                                {
                                    // !this.state.checkListSubmitted ?
                                    !this.state.dealer.isCompleted ?
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