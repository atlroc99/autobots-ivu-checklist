import React, { Component } from "react";
import { Form, Modal, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import LiteModal from './LiteModal';
import CustomCheckbox from './CustomCheckbox';
import AdminButton from "./AdminButton";
import UserButton from "./UserButton";
import { v4 as uuidv4, v4 } from 'uuid';
import CHECKLIST from "./test";

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
                uiTheme: '',
                migrationDate: new Date(),
                migrationDateStr: '',
                migrationDateEpoch: 0,
            },

            dateStr: '',
            lockCheckBoxes: false,

            tempCheckListItems: [],

            checkListSubmitted: false, // hide the buttons if true
            // dealershipName: '',
            // endcustomer: '',
            // items: [],
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
            isCharLimitExceeded: false,
            // holds checklist item data for the item that is updating
            customLabelObject: { id: '', name: '', label: '' },
            isUpdatingLabel: false,
            labelValue: '',
        };
        // console.log('Inside WelcomePacket Constructor')
    }

    // isComplete = false;
    async componentDidMount() {
        console.log('in componentDidMount')
        // const response = await axios.get(url + `/${this.props.match.params.dealership}`);
        // const dealer = { ...response.data }
        const response = CHECKLIST;
        console.log('response', response)
        const dealer = { ...response }
        this.setState({ lockCheckBoxes: dealer.isCompleted })
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

    chooseMigrationDate = (migrationDate) => {
        const epochTime = migrationDate.getTime() / 1000;
        const dealer = this.state.dealer;
        dealer.migrationDate = migrationDate;
        dealer.migrationDateStr = migrationDate.toDateString()
        dealer.migrationDateEpoch = epochTime
        this.setState({ dealer })
    }

    handleChange = (event) => {
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
        // this.setState({ isComplete: this.state.items.every(i => i.isChecked === true) })
        console.log('all checked: ', this.state.dealer.checklists.every(i => i.isChecked === true));
        this.setState({ isComplete: this.state.dealer.checklists.every(i => i.isChecked === true) })
    }

    update = async (e) => {
        e.preventDefault();
        const dealershipName = this.state.dealer.dealerName ? this.state.dealer.dealerName : 'NIL';

        const payload = JSON.stringify(this.state.dealer);
        this.setState({ isUpdating: true })

        const response = await axios.put(`${url}/${dealershipName}?update=true`, payload);
        const str_val = JSON.stringify(response.data);
        const data = JSON.parse(str_val)

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
            modalTitle: `Submitting data for ${this.state.dealer.dealerName}`,
            modalBody: 'Once Submitted, you will not be able to update the data. Please choose a migration date if you want to submit',
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

    isSubmited(data) {
        return data.every(item => item.isChecked === true);
    }

    handleOnChangeLabel = (value, itemName, itemId) => {
        console.log('value: ', value);
        console.log('itemName', itemName);
        console.log('itemId', itemId);
        const tempCheckListItems = this.state.tempCheckListItems

        tempCheckListItems.push({
            "id": itemId,
            "name": itemName,
            "label": value,
            "isChecked": false
        });
        this.setState({ tempCheckListItems })
        console.log('TEMP CHECKLIST ITEMS: ', this.state.tempCheckListItems);
    }

    adminSaveChanges = (event) => {
        event.preventDefault();
        console.log('Admin SAVING changes: ', event.target);
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

        dealer.isCompleted = false
        tempCheckListItems = []
        this.setState({ dealer })
        this.setState({ tempCheckListItems })
        this.update(event);
    }

    openAddLabelModal = () => {
        console.log('adding stuff to the list');
        this.setState({ isShowAddLabelModal: true });
    }

    /**
     * currenty works with adding a new label / checklist content
     * when user adds a new label in the text-area he/she clicks on teh add button to a new label to the list
     * a new id is added current item size + 1
     * a new name is added userDefinedLabel_id
     * the function takes the current deaer.checklist and upadates the checklist and update state of the dealer
     */
    addOrUpdateLabel = (e) => {
        const dealer = this.state.dealer
        const checklists = dealer.checklists
        const labelValue = this.state.labelValue

        if (this.state.isUpdatingLabel && labelValue) {
            console.log('udpating checklist label... ')
            const customObject = this.state.customLabelObject
            // console.log('customObject', customObject)
            // console.log('upadted label', this.state.labelValue)
            checklists.forEach(item => {
                if (item.name === customObject.name) {
                    item.label = labelValue;
                }
            })
            // ???
            this.setState({ isUpdatingLabel: false })
        } else {
            console.log('Adding a new checklist item with label: ', labelValue)
            // const label = document.getElementById('cbx-label').value;
            const uuid = uuidv4().substr(0, 8);
            const item = {
                'id': uuid,
                'name': 'userDefinedLabel_' + uuid,
                'label': labelValue,
                'isChecked': false
            }

            // dealer.isCompleted = false;
            checklists.push(item);
        }

        this.setState({ labelValue: '' })
        this.setState({ dealer });
        this.setState({ isShowAddLabelModal: false });
    }

    /**
     * applies to text area when new checklsit label is added:
     * observes if the content type in the text-area does not exceeds max character limits (256) -> 
     * disable add button and shows alert
     **/
    validateLabelContent = (e) => {
        this.setState({ labelValue: e.target.value })
        // const labelChar = e.target.value;
        // console.log('text-area value: ', labelChar);
        const disable = this.state.labelValue.length > 255 ? true : false;
        this.setState({ isCharLimitExceeded: disable })
        if (disable) {
            alert('Exceeded Max character count (256)');
        }
    }

    reload = () => {
        window.location.reload(false);
    }

    /* Allows admin to edit checklist label / content -> opens up chosen label in a modal and allow user to update and save */
    editLabel = (itemData) => {
        console.log('itemData', itemData);
        this.setState({ customLabelObject: itemData });
        this.setState({ labelValue: itemData.label });
        this.setState({ isShowAddLabelModal: true });
        this.setState({ isUpdatingLabel: true });

        const dealer = this.state.dealer;
        dealer.checklists.forEach(item => {
            if (itemData.name === item.name) {
                item.label = itemData.label
            }
        });
        this.setState({ dealer });
    }

    /* Allows admin to delete a checklist item / label */
    removeLabel = (itemData) => {
        console.log('itemData', itemData);
        const dealer = this.state.dealer;
        const filteredList = dealer.checklists.filter((item) => {
            return item.name !== itemData.name
        });

        console.log('filteredCheckList', filteredList)
        dealer.checklists = filteredList
        this.setState({ dealer })
        // make axio.put call to update the database in the be
    }

    render() {
        return (
            <div style={{marginTop:'150px'}}>
                <div className="row">
                    <div className="col col-6">
                        <h2 style={{fontFamily:'serif',textTransform:'capitalize'}}>Welcome Packet checklist</h2>
                        <h5 h2 style={{fontFamily:'serif',textTransform:'capitalize',}}>{this.state.dealer.dealerName}</h5>
                    </div>
                    <div className="col col-6">
                        <h5 style={{fontFamily:'serif',textTransform:'capitalize', float: 'right', marginTop: '50px', marginLeft: '300px' }}>{this.state.dealer.endCustomerCompany}</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h6 style={{fontFamily:'serif'}}>Logged in As Admin: {this.state.isAdmin ? 'True' : 'False'}</h6>
                        <h6 style={{fontFamily:'serif',textTransform:'capitalize'}}>dealer submitted / completed form: {this.state.dealer.isCompleted ? 'True' : 'False'}</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="checklistBox">
                        <fieldset>
                            <Form className="p-4">
                                <div className="title"><i className="fas fa-list-alt"></i>  Welcome Packet Checklist - Beta(iVu)</div>
                                <Table borderless hover size='lg'>
                                    <tbody style={{fontFamily:'serif', textAlign: 'justify'}}>
                                        {// render checklist
                                            this.state.dealer.checklists.map((item, idx) => {
                                                return (
                                                    <Form.Group key={idx}>
                                                        <CustomCheckbox 
                                                            dealer={this.state.dealer}
                                                            isAdmin={this.state.isAdmin}
                                                            onChange={this.handleChange}
                                                            editLabel={this.editLabel}
                                                            removeLabel={this.removeLabel}
                                                            handleOnChangeLabel={this.handleOnChangeLabel}
                                                            // disableCheckBoxes={this.state.dealer.isCompleted}
                                                            disableCheckBoxes={this.state.lockCheckBoxes}
                                                            {...item} />
                                                    </Form.Group>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                {
                                    !this.state.isAdmin && !this.state.dealer.isCompleted ?
                                        <UserButton
                                            update={this.update}
                                            submit={this.submit}
                                            isAdmin={this.state.isAdmin}
                                            isAllChecked={this.state.isComplete} />
                                        : this.state.isAdmin ? <AdminButton
                                            isAdmin={this.state.isAdmin}
                                            isShowAddLabelModal={(yes) => { this.setState({ isShowAddLabelModal: yes }) }}
                                            cancelChanges={() => window.location.reload(false)}
                                            saveChanges={this.adminSaveChanges} />
                                            : null
                                }
                                <LiteModal
                                    title={this.state.modalTitle}
                                    body={this.state.modalBody}
                                    show={this.state.showModal}
                                    handleClose={this.handleCloseModal}
                                    chooseMigrationDate={this.chooseMigrationDate}
                                    onClick={this.state.isUpdating ? this.handleCloseModal : this.handleAcceptDataSubmission}
                                    buttonValue_1={this.state.buttonValue_1}
                                    buttonValue_2={this.state.buttonValue_2}
                                />
                            </Form>
                        </fieldset>
                        { // Button: Add new item - > adds new a label + checklist item (only role - admin or cx)
                            this.state.isAdmin ?
                                <div className="addLabelModal">
                                    {/* <Button variant="primary" onClick={() => this.setState({ isShowAddLabelModal: true })}>Add new Item</Button> */}
                                    <Modal show={this.state.isShowAddLabelModal} onHide={this.handleCloseModal}>
                                        <Modal.Header style={{fontFamily:'serif'}}>Checklist Item</Modal.Header>
                                        <Modal.Body>
                                            <label for="cbx-label">{this.state.isUpdatingLabel ? 'Update content below or cancel' : 'Enter new Item below'}</label>
                                            <textarea 
                                                id="cbx-label"
                                                name="cbx-label"
                                                row="10" cols="50"
                                                minLength="5" maxLength="256"
                                                // defaultValue={this.state.customLabelObject.label}
                                                placeholder="Max 256 characters"
                                                value={this.state.labelValue}
                                                onChange={this.validateLabelContent}>
                                            </textarea>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant='primary' onClick={(e) => {
                                                this.setState({ // setting all value to default. Avoding item label previsouly subject to update showing up in the areabox when add new item btn is clicked
                                                    isShowAddLabelModal: false,
                                                    isUpdatingLabel: false,
                                                    labelValue: ""
                                                })
                                            }}>
                                                Cancel
                                            </Button>
                                            <Button
                                                variant='primary'
                                                disabled={this.state.isCharLimitExceeded}
                                                // onClick={this.state.isUpdatingLabel ? this.updateLabel : this.addLabel}>
                                                onClick={this.addOrUpdateLabel}>
                                                {this.state.isUpdatingLabel ? 'Update' : 'Add'}
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                : null
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default WelcomePacketCheckList;