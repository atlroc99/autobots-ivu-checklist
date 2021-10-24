import React, { Component } from "react";
import { Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import LiteModal from './LiteModal';
import CustomCheckbox from './CustomCheckbox';
import AdminButton from "./AdminButton";
import UserButton from "./UserButton";

// const url = 'http://localhost:8000';
const url = 'http://localhost:3000/checklists';

class WelcomePacketCheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: true,
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

            tempCheckListItems: [],

            checkListSubmitted: false, // hide the buttons if true
            dealershipName: '',
            endcustomer: '',
            items: [],
            isComplete: false,
            showdealershipName: false,
            showModal: false,
            isSubmitting: false,
            modalTitle: '',
            modalBody: '',
            disableCheckBoxes: false,
            isUpdating: false,
            buttonValue_1: '',
            buttonValue_2: '',
            refresh: false,

            // custom label for checklist
            isShowAddLabelModal: false,
            disableLabelAddButton: false,
            customLabel: '',
        };
        // console.log('Inside WelcomePacket Constructor')
    }



    // isComplete = false;
    async componentDidMount() {
        console.log('in componentDidMount')
        const response = await axios.get(url + `/${this.props.match.params.dealership}`);
        console.log('response', response)
        // const { data } = JSON.parse(response.data);
        const dealer = { ...response.data }
        this.setState({ dealer })
        console.log(this.state.dealer)
        // this.setState({ isAdmin: true })
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
        console.log('handling click checkbox')
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
        this.setState({ isUpdating: true })
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

    // lookupCustomerData = (event) => {
    //     event.preventDefault();
    //     console.log('value: ', this.state.dealershipName);
    //     const response = this.searchCustomer(this.state.dealershipName, event)
    //     event.preventDefault();
    // }

    isSubmited(data) {
        return data.every(item => item.isChecked === true);
    }

    handleOnChangeLabel = (value, itemName, itemId) => {
        console.log('value: ', value);
        console.log('itemName', itemName);
        console.log('itemId', itemId);
        const tempCheckListItems = this.state.tempCheckListItems

        // handle duplicate
        tempCheckListItems.push({
            "id": itemId,
            "name": itemName,
            "label": value,
        });
        this.setState({ tempCheckListItems })
        console.log('TEMP CHECKLIST ITEMS: ', this.state.tempCheckListItems);
    }

    // adminCancelChanges = (event) => {
    //     event.preventDefault();
    //     console.log('Admin cancel changes: ');
    //     this.reload()
    // }

    adminSaveChanges = (event) => {
        event.preventDefault();
        this.print('Admin SAVING changes: ', event.target);

        //needs to update the state of  dealer checklist lable 
        const dealer = this.state.dealer;
        const dealerChecklist = dealer.checklists;
        let tempCheckListItems = this.state.tempCheckListItems;

        dealerChecklist.forEach(dealerItem => {
            tempCheckListItems.forEach(tempItem => {
                if (dealerItem.name.trim() === tempItem.name.trim()) {
                    dealerItem['label'] = tempItem.label;
                }
            });
        });

        tempCheckListItems = []
        this.setState({ dealer })
        this.setState({ tempCheckListItems })

        this.print('Finally, ')

        console.log('UPDATED DEALER CHECKLIST ')
        console.log(this.state.dealer)

        console.log('*** TEMP CHECK LIST')
        console.log(this.state.tempCheckListItems)

        this.update(event);
    }

    print(val) {
        console.log(val);
    }


    openAddLabelModal = () => {
        console.log('adding stuff to the list');
        this.setState({ isShowAddLabelModal: true });
    }

    addLabel = (e) => {
        const label = document.getElementById('cbx-label').value;
        console.log('target.value', label);
        const dealer = this.state.dealer
        const checklists = dealer.checklists
        const id = checklists.length + 1;

        if (!label) {
            return;
        }

        const item = {
            'id': id,
            'name': 'userDefinedLabel_' + id,
            'label': label,
            'isChecked': false
        }

        checklists.push(item);
        this.setState({ dealer });

        this.setState({ isShowAddLabelModal: false });
    }

    manageAddLabel = (e) => {
        const labelChar = e.target.value;
        console.log('text-area value: ', labelChar);
        const disable = labelChar.length > 255 ? true : false;
        this.setState({ disableLabelAddButton: disable })
        if (disable) {
            alert('Exceeded Max character count (256)');
        }
    }

    reload = () => {
        window.location.reload(false);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col col-6">
                        <h2>Welcome Packet checklist</h2>
                        <h5>{this.state.dealer.dealerName}</h5>
                        <hr />
                        <h6>Logged in As Admin: {this.state.isAdmin ? 'True' : 'False'}</h6>
                        <h6>dealer submitted / completed form: {this.state.dealer.isCompleted ? 'True' : 'False'}</h6>
                    </div>
                    <div className="col col-6">
                        <h5 style={{ float: 'right', marginTop: '20px', marginRight: '70px' }}>{this.state.dealer.endCustomerCompany}</h5>
                    </div>
                </div>
                <hr />
                <div className="checklistBox">
                    <fieldset>
                        <Form className="p-4">
                            <div className="title"><i className="fas fa-list-alt"></i>  Welcome Packet Checklist - Beta(iVu)</div>
                            {// render checklist
                                this.state.dealer.checklists.map((item, idx) => {
                                    return (
                                        <Form.Group key={idx}>
                                            <CustomCheckbox
                                                dealer={this.state.dealer}
                                                isAdmin={this.state.isAdmin}
                                                onChange={this.handleChange}
                                                handleOnChangeLabel={this.handleOnChangeLabel}
                                                disableCheckBoxes={this.state.dealer.isCompleted}
                                                {...item} />
                                        </Form.Group>
                                    )
                                })
                            }
                            {
                                !this.state.isAdmin && !this.state.dealer.isCompleted ?
                                    <UserButton
                                        update={this.update}
                                        submit={this.submit}
                                        isAdmin={this.state.isAdmin}
                                        isAllChecked={this.state.isComplete} />
                                    : this.state.isAdmin ? <AdminButton
                                        isAdmin={this.state.isAdmin}
                                        cancelChanges={()=> window.location.reload(false)}
                                        saveChanges={this.adminSaveChanges} />
                                        : null
                            }
                            <LiteModal
                                title={this.state.modalTitle}
                                body={this.state.modalBody}
                                show={this.state.showModal}
                                handleClose={this.handleCloseModal}
                                onClick={this.state.isUpdating ? this.handleCloseModal : this.handleAcceptDataSubmission}
                                buttonValue_1={this.state.buttonValue_1}
                                buttonValue_2={this.state.buttonValue_2}
                            />
                        </Form>
                    </fieldset>
                    {
                        this.state.isAdmin ?
                            <div className="addLabelModal">
                                <Button variant="primary" onClick={this.openAddLabelModal}>Add an Item</Button>
                                <Modal show={this.state.isShowAddLabelModal} onHide={this.handleCloseModal}>
                                    <Modal.Header>Modal Heading</Modal.Header>
                                    <Modal.Body>
                                        <label for="cbx-label">Enter new Item below</label>
                                        <textarea
                                            id="cbx-label"
                                            name="cbx-label"
                                            row="10" cols="50"
                                            minLength="5" maxLength="256"
                                            defaultValue={this.state.customLabel}
                                            placeholder="Max 256 characters"
                                            onChange={this.manageAddLabel}>
                                        </textarea>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant='primary' onClick={(e) => { this.setState({ isShowAddLabelModal: false }) }}>Cancel</Button>
                                        <Button variant='primary' disabled={this.state.disableLabelAddButton} onClick={this.addLabel}>Add</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            : null
                    }
                </div>
            </div>
        )
    }
}

export default WelcomePacketCheckList;