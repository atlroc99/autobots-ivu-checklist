import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import LiteModal from './LiteModal';
import Checkbox from './CustomCheckbox';
// import {CHECKLIST_SERVICE} from './Endpoint';

function IvuChecklist() {

  const url = 'http://localhost:8000';

  const [iTSecurityDocReviewedAndApproved, setITSecurityDocReviewedAndApproved] = useState(false);
  const [outboundPortEnabled, setOutboundPortEnabled] = useState(false);
  const [certAuthIdentified, setCertAuthIdentified] = useState(false);
  // const [ivuProUpgraded, setIvuProUpgraded] = useState(false);
  // const [uSBRouterUpdated, setUSBRouterUpdated] = useState(false);
  // const [userRouterUpdated, setUserRouterUpdated] = useState(false);
  // const [siteHasLocalBackeup, setSiteHasLocalBackeup] = useState(false);
  // const [agentInstalled, setAgentInstalled] = useState(false);
  // const [migrationLinkSupplied, setMigrationLinkSupplied] = useState(false);
  // const [syncValidated, setSyncValidated] = useState(false);
  // const [screenshotsCaptured, setScreenshotsCaptured] = useState(false);
  // const [credentialsCreated, setCredentialsCreated] = useState(false);
  // const [onboardingTrainingScheduled, setOnboardingTrainingScheduled] = useState(false);
  // const [onboardingTrainingConducted, setOnboardingTrainingConducted] = useState(false);
  // const [customerHasPortalAccess, setCustomerHasPortalAccess] = useState(false);
  // const [syncComplete, setSyncComplete] = useState(false);

  const [customerId, setcustomerId] = useState("")
  const [tempCustomerID, setTempCustomerID] = useState('')
  const [isCheckListCompleted, setIsCheckListCompleted] = useState(false)

  const update = async (event) => {
    event.preventDefault();
    console.log('UPDATING!!! ')
    const data = getNewData();
    // const response = await axios.put(`${url}/${customerId}`, {data});
    const _customerId = customerId ? customerId : 'NIL';
    console.log('customerId', _customerId)
    const response = await axios.put(`${url}/${_customerId}`, { data })

    if (response.data) {
      console.log('data updated', response.data)
      const isComplete = response.data.isComplete
      console.log('isComplete:', isComplete)
      setIsCheckListCompleted(isComplete)
      alert('Successfully updated');
    }
    console.log('isCheckListCompleted:', isCheckListCompleted)
    // reset()
  }

  const submit = (e) => {
    e.preventDefault();
    const newData = getNewData();
    const data = JSON.stringify(newData)
    const response = axios.post(`${url}/${customerId}`, { newData })

    if (response) {
      alert("Data Saved Successfully!")
    }
  }

  const getNewData = () => {
    const newData = {
      iTSecurityDocReviewedAndApproved,
      outboundPortEnabled,
      certAuthIdentified,
      // ivuProUpgraded,
      // uSBRouterUpdated,
      // userRouterUpdated,
      // siteHasLocalBackeup,
      // agentInstalled,
      // migrationLinkSupplied,
      // syncValidated,
      // screenshotsCaptured,
      // credentialsCreated,
      // onboardingTrainingScheduled,
      // onboardingTrainingConducted,
      // customerHasPortalAccess,
      // syncComplete
    }
    return newData;
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true)
  }

  const resetParentValue = () => {
    setITSecurityDocReviewedAndApproved(false);
    setOutboundPortEnabled(false);
    setCertAuthIdentified(false);
    // setIvuProUpgraded(false);
    // setUSBRouterUpdated(false);
    // setUserRouterUpdated(false);
    // setSiteHasLocalBackeup(false);
    // setAgentInstalled(false);
    // setMigrationLinkSupplied(false);
    // setSyncValidated(false);
    // setScreenshotsCaptured(false);
    // setCredentialsCreated(false);
    // setOnboardingTrainingScheduled(false);
    // setOnboardingTrainingConducted(false);
    // setCustomerHasPortalAccess(false);
    // setSyncComplete(false);
  }

  const reset = () => {
    resetParentValue();
    window.location.reload();
  }

  const searchCustomer = async (event) => {
    event.preventDefault();
    const response = await axios.get(`${url}/${customerId}`)
    if (response.data) {
      setTempCustomerID(customerId);
    }
    console.log('In search customer data: ', response);
    const checklistsObject = JSON.parse(response.data.checklistsObject);
    console.log('parsed checklistsObject: ', checklistsObject)
    populateCheckBoxes(checklistsObject.data)
    setIsCheckListCompleted(checklistsObject.data.isComplete)
  }

  const populateCheckBoxes = (data) => {
    console.log('populating check boxes with data:', data)
    const keys = Object.keys(data);
    keys.forEach(key => {
      let setStateFn = 'set' + key.charAt(0).toUpperCase() + key.slice(1)
      const param = data[key];
      eval(`${setStateFn}(${param})`)
    });
  }

  const [checkBoxTracker, setCheckBoxTracker] = useState({
    iTSecurityDocReviewedAndApproved: false,
    outboundPortEnabled: false,
    certAuthIdentified: false
  });

  const handleOnChange = (event) => {
    const propName = event.target.name;
    const isCheked = event.target.checked;

    console.log('update checkBox Tracker')
    // checkBoxTracker[propName] = isCheked
    console.log(`propName: ${propName} | value: ${isCheked}`)
    setCheckBoxTracker()
    console.log('tracker', checkBoxTracker)

    const fnString = 'set' + propName.charAt(0).toUpperCase() + propName.slice(1);
    const invokeFn = `${fnString}(${isCheked})`
    console.log('invoking: ', invokeFn)

    eval(invokeFn)
  }

  return (
    <div>
      <form style={{ margin: '100px', paddingTop: '50px' }} onSubmit={searchCustomer}>
        <label>Enter customer id
          <input style={{ marginLeft: '10px' }} type='text' value={customerId} onChange={e => setcustomerId(e.target.value)} />
        </label>
        <Button type="submit" variant='primary' style={{ marginLeft: '50px' }}>Search</Button>
      </form>

      <div className="checklistBox">
        <fieldset>
          <Form className="p-4">

            <Form.Group id="customerId" className="mb-3">
              <Form.Label>Enter Customer ID to update</Form.Label>
              <Form.Control type='text' placeholder='customer ID' value={tempCustomerID ? tempCustomerID : ''} onChange={(e) => setcustomerId(e.target.value)}></Form.Control>
            </Form.Group>

            <div className="title"><i className="fas fa-list-alt"></i>  Welcome Packet Checklist - Beta(iVu)</div>
            <div> {/*TODO remove: temporary div for collapsing the form groups */}
              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  name="iTSecurityDocReviewedAndApproved"
                  value={iTSecurityDocReviewedAndApproved}
                  checked={iTSecurityDocReviewedAndApproved}
                  // onChange={() => setITSecurityDocReviewedAndApproved(!iTSecurityDocReviewedAndApproved)}
                  onChange={handleOnChange}
                  label="IT security documents on BACnet/SC & i-Vu?? Cloud reviewed and approved" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  name="outboundPortEnabled"
                  value={outboundPortEnabled}
                  checked={outboundPortEnabled}
                  // onChange={() => setOutboundPortEnabled(!outboundPortEnabled)}
                  onChange={handleOnChange}
                  label="Outbound Port availability (port 443 as default) enabled. (Following the IT Security documents listed above, BACnet/SC requires outbound communication to the cloud hosted BACnet/SC hub. If IT requires the i-Vu?? Service URL to be whitelisted, note this on the provisioning form when ordering the license.)" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  name="certAuthIdentified"
                  value={certAuthIdentified}
                  checked={certAuthIdentified}
                  // onChange={() => setCertAuthIdentified(!certAuthIdentified)}
                  onChange={handleOnChange}
                  label="Certificate authority identified which will be used to generate BACnet/SC certificates" />
              </Form.Group>

              {/* 
              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={ivuProUpgraded}
                  checked={ivuProUpgraded}
                  // onChange={() => setIvuProUpgraded(!ivuProUpgraded)}
                  onChange={handleOnChange}
                  label="I-Vu?? Pro has been upgraded to the latest version and patch. If running I-Vu?? Standard or Plus, these must also be upgraded to I-Vu Pro and placed on a temporary PC. A dealer license may be used to perform this upgrade if the customer license is not at version 8+. (~2-4 hours)" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={uSBRouterUpdated}
                  checked={uSBRouterUpdated}
                  onChange={() => setUSBRouterUpdated(!uSBRouterUpdated)}
                  label="USB Routers have been updated to XT Routers/Gateways. I-Vu?? Standard and Plus systems using USB Adapters to connect to serial MS/TP networks are not supported by I-Vu?? Pro. These would need to be replaced by a XT router or gateway" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={userRouterUpdated}
                  checked={userRouterUpdated}
                  onChange={() => setUserRouterUpdated(!userRouterUpdated)}
                  label="All IP devices to be connected to I-Vu?? Cloud service are XT-RB (Interim). A XT-RB may be used to route BACnet/IP traffic from legacy devices or be replacement of those devices. (~4-6 hours per router)" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={siteHasLocalBackeup}
                  checked={siteHasLocalBackeup}
                  onChange={() => setSiteHasLocalBackeup(!siteHasLocalBackeup)}
                  label="The site has a local backup of the I-Vu?? database. Although it???s highly unlikely to have any data loss, it???s always a best practice to make a backup onto another drive. (~2 hours)" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={agentInstalled}
                  checked={agentInstalled}
                  onChange={() => setAgentInstalled(!agentInstalled)}
                  label="Agent Installed. this is the agent that will sync with your current site to complete the migration to the cloud" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={migrationLinkSupplied}
                  checked={migrationLinkSupplied}
                  onChange={() => setMigrationLinkSupplied(!migrationLinkSupplied)}
                  label="ALC Migration Team will supply a link for the migration agent that needs to be installed" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={syncValidated}
                  checked={syncValidated}
                  onChange={() => setSyncValidated(!syncValidated)}
                  label="Validation of Sync. ALC Migration Team will validate that the agent has installed correctly, and that the system sync has started" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={screenshotsCaptured}
                  checked={screenshotsCaptured}
                  onChange={() => setScreenshotsCaptured(!screenshotsCaptured)}
                  label="Baseline System Metrics. Capture screenshots of your baseline system metrics, before the migration has been scheduled" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={credentialsCreated}
                  checked={credentialsCreated}
                  onChange={() => setCredentialsCreated(!credentialsCreated)}
                  label="Credentials Created. Temporary user access has been given to user Migration Ops Team Member. Credentials sent directly to (x) group" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={onboardingTrainingScheduled}
                  checked={onboardingTrainingScheduled}
                  onChange={() => setOnboardingTrainingScheduled(!onboardingTrainingScheduled)}
                  label="Onboarding Training Schedule. Onboarding Training has been scheduled with all appropriate users of i-Vu Cloud" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={onboardingTrainingConducted}
                  checked={onboardingTrainingConducted}
                  onChange={() => setOnboardingTrainingConducted(!onboardingTrainingConducted)}
                  label="Onboarding Training Conducted. Onboarding Training has been conducted, and i-Vu Customer Success Manager was included" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={customerHasPortalAccess}
                  checked={customerHasPortalAccess}
                  onChange={() => setCustomerHasPortalAccess(!customerHasPortalAccess)}
                  label="Customer Portal Access. i-Vu cloud users have been identified, given credentials to the Customer Portal, and access has been verified" />
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  value={syncComplete}
                  checked={syncComplete}
                  onChange={() => setSyncComplete(!syncComplete)}
                  label="Sync Complete. ALC Migration team will verify that the Initial sync is complete" />
              </Form.Group> */}
            </div>
            <div style={{ marginLeft: '40%' }}>

              <Button type="reset" onClick={handleShow} variant="outline-warning" style={{ width: '200px', margin: '5px' }}><i className="fas fa-sync-alt"></i> Reset</Button>
              <Button type="submit" disabled={isCheckListCompleted}
                onClick={update}
                variant="outline-primary"
                style={{ width: '200px', margin: '5px' }}>
                <i className="fas fa-sync-alt"></i>
                Update
              </Button>
              <Button type="submit"
                disabled={!isCheckListCompleted}
                onClick={submit}
                variant="danger"
                style={{ width: '200px', margin: '5px' }}>
                <i className="fas fa-save"></i>
                Submit
              </Button>

              <LiteModal
                title='Reseting Fields'
                body='Reseting will reset all the fields. Are you sure you want to reset?'
                show={show}
                handleClose={handleClose}
                onClick={reset}
                buttonValue_1='Yes'
                buttonValue_2='No'
              />
            </div>
          </Form>
        </fieldset>
      </div>
    </div>
  )
}

export default IvuChecklist