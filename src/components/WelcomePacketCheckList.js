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
            customerId: '',
            isComplete: false,
            items: []
        };
    }

    async componentDidMount() {
        const checklist = await axios.get(url + '/checklist/items')
        this.setState({ items: checklist.data });
    }

    async searchCustomer(customerId, event) {
        console.log('customer ID searching...:', customerId);
        const response = await axios.get(`${url}/${customerId}`)
        const item = JSON.parse(response.data.checklistsObject)

        if (item.length > 1) {
            this.setState({ customerId: customerId });
        }

        if (item.length === 0) {
            console.log('empty response', item)
            this.setState({ customerId: "" });
            event.target.reset();
            return;
        }
        this.setState({ items: item })
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
    }

    update = async (e) => {
        e.preventDefault();
        console.log('UPDATING!!! ')
        console.log('updated items: ', this.state.items);

        const customerId = this.state.customerId ? this.state.customerId : 'NIL';
        const response = await axios.put(`${url}/${customerId}`, this.state.items);

        console.log(response.data)
        this.setState({ isComplete: response.data.isComplete });
    }

    submit = (e) => {
        e.preventDefault();
        // const response = axios.post(`${url}/${customerId}`, { newData })
    }

    lookupCustomerData = (event) => {
        event.preventDefault();
        console.log('value: ', this.state.customerId);
        const response = this.searchCustomer(this.state.customerId, event)
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h5>Class Component</h5>
                <form className="searchForm" onSubmit={this.lookupCustomerData}>
                    <label>Enter customer id
                        {/* <input style={{ marginLeft: '10px' }} type='text' value={this.customerId} onChange={e => setcustomerId(e.target.value)} /> */}
                        <input className="searchFormInput" type='text' value={this.customerId} onChange={(e) => this.setState({ customerId: e.target.value })} />
                    </label>
                    <Button type="submit" variant='primary' style={{ marginLeft: '50px' }}>Search</Button>
                </form>
                <div className="checklistBox">
                    <fieldset>
                        <Form className="p-4">
                            <p>
                                Update customerID: {this.state.customerId}
                            </p>
                            <div className="title"><i className="fas fa-list-alt"></i>  Welcome Packet Checklist - Beta(iVu)</div>
                            {
                                this.state.items.map((item, idx) => {
                                    return (
                                        <Form.Group key={idx}>
                                            <CustomCheckbox onChange={this.handleChange} {...item} />
                                        </Form.Group>
                                    )
                                })
                            }
                            <div style={{ marginLeft: '40%' }}>
                                <Button type="submit"
                                    value='Update'
                                    onClick={this.update}
                                    variant="outline-primary"
                                    style={{ width: '200px', margin: '5px' }}>
                                    <span style={{ marginRight: '15px' }}>Update</span>
                                    <i className="fas fa-sync-alt" />
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={this.submit}
                                    variant="danger"
                                    style={{ width: '200px', margin: '5px' }}>
                                    <span style={{ marginRight: '15px' }}>Submit</span>
                                    <i className="fas fa-save" />
                                </Button>
                            </div>
                        </Form>
                    </fieldset>
                </div>
            </div>
        )
    }
}

export default WelcomePacketCheckList;