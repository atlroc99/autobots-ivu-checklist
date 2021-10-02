import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
// import {CHECKLIST_SERVICE} from './Endpoint';

function IvuChecklist() {

  const [iTSecurityDocReviewedAndApproved, setITSecurityDocReviewedAndApproved] = useState(false);
  const [outboundPortEnabled, setOutboundPortEnabled] = useState(false);
  const [certAuthIdentified, setCertAuthIdentified] = useState(false);
  const [ivuProUpgraded, setIvuProUpgraded] = useState(false);
  const [uSBRouterUpdated, setUSBRouterUpdated] = useState(false);
  const [userRouterUpdated, setUserRouterUpdated] = useState(false);
  const [siteHasLocalBackeup, setSiteHasLocalBackeup] = useState(false);
  const [agentInstalled, setAgentInstalled] = useState(false);
  const [migrationLinkSupplied, setMigrationLinkSupplied] = useState(false);
  const [syncValidated, setSyncValidated] = useState(false);
  const [screenshotsCaptured, setScreenshotsCaptured] = useState(false);
  const [credentialsCreated, setCredentialsCreated] = useState(false);
  const [onboardingTrainingScheduled, setOnboardingTrainingScheduled] = useState(false);
  const [onboardingTrainingConducted, setOnboardingTrainingConducted] = useState(false);
  const [customerHasPortalAccess, setCustomerHasPortalAccess] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const newData = {
      iTSecurityDocReviewedAndApproved,
      outboundPortEnabled,
      certAuthIdentified,
      ivuProUpgraded,
      uSBRouterUpdated,
      userRouterUpdated,
      siteHasLocalBackeup,
      agentInstalled,
      migrationLinkSupplied,
      syncValidated,
      screenshotsCaptured,
      credentialsCreated,
      onboardingTrainingScheduled,
      onboardingTrainingConducted,
      customerHasPortalAccess,
      syncComplete
    }
    
    const data = JSON.stringify(newData)
    console.log('data', data)

    axios.post('https://hhgq8zymx8.execute-api.us-west-1.amazonaws.com/v1/provisioning-services', {data})
      .then(response => {
        console.log("test", response.data)
        alert("Data Saved Successfully!")
      })
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
    setIvuProUpgraded(false);
    setUSBRouterUpdated(false);
    setUserRouterUpdated(false);
    setSiteHasLocalBackeup(false);
    setAgentInstalled(false);
    setMigrationLinkSupplied(false);
    setSyncValidated(false);
    setScreenshotsCaptured(false);
    setCredentialsCreated(false);
    setOnboardingTrainingScheduled(false);
    setOnboardingTrainingConducted(false);
    setCustomerHasPortalAccess(false);
    setSyncComplete(false);
  }

  const reset = () => {
    resetParentValue();
    window.location.reload();
  }

  return (
    <div className="checklistBox">
      <fieldset>
        <Form className="p-4">

          <div className="title"><i className="fas fa-list-alt"></i>  Welcome Packet Checklist - Beta(iVu)</div>
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={iTSecurityDocReviewedAndApproved}
              checked={iTSecurityDocReviewedAndApproved}
              onClick={() => setITSecurityDocReviewedAndApproved(!iTSecurityDocReviewedAndApproved)}
              label="IT security documents on BACnet/SC & i-Vu® Cloud reviewed and approved" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={outboundPortEnabled}
              checked={outboundPortEnabled}
              onClick={() => setOutboundPortEnabled(!outboundPortEnabled)}
              label="Outbound Port availability (port 443 as default) enabled. (Following the IT Security documents listed above, BACnet/SC requires outbound communication to the cloud hosted BACnet/SC hub. If IT requires the i-Vu® Service URL to be whitelisted, note this on the provisioning form when ordering the license.)" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={certAuthIdentified}
              checked={certAuthIdentified}
              onClick={() => setCertAuthIdentified(!certAuthIdentified)}
              label="Certificate authority identified which will be used to generate BACnet/SC certificates" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={ivuProUpgraded}
              checked={ivuProUpgraded}
              onClick={() => setIvuProUpgraded(!ivuProUpgraded)}
              label="I-Vu® Pro has been upgraded to the latest version and patch. If running I-Vu® Standard or Plus, these must also be upgraded to I-Vu Pro and placed on a temporary PC. A dealer license may be used to perform this upgrade if the customer license is not at version 8+. (~2-4 hours)" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={uSBRouterUpdated}
              checked={uSBRouterUpdated}
              onClick={() => setUSBRouterUpdated(!uSBRouterUpdated)}
              label="USB Routers have been updated to XT Routers/Gateways. I-Vu® Standard and Plus systems using USB Adapters to connect to serial MS/TP networks are not supported by I-Vu® Pro. These would need to be replaced by a XT router or gateway" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={userRouterUpdated}
              checked={userRouterUpdated}
              onClick={() => setUserRouterUpdated(!userRouterUpdated)}
              label="All IP devices to be connected to I-Vu® Cloud service are XT-RB (Interim). A XT-RB may be used to route BACnet/IP traffic from legacy devices or be replacement of those devices. (~4-6 hours per router)" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={siteHasLocalBackeup}
              checked={siteHasLocalBackeup}
              onClick={() => setSiteHasLocalBackeup(!siteHasLocalBackeup)}
              label="The site has a local backup of the I-Vu® database. Although it’s highly unlikely to have any data loss, it’s always a best practice to make a backup onto another drive. (~2 hours)" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={agentInstalled}
              checked={agentInstalled}
              onClick={() => setAgentInstalled(!agentInstalled)}
              label="Agent Installed. this is the agent that will sync with your current site to complete the migration to the cloud" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={migrationLinkSupplied}
              checked={migrationLinkSupplied}
              onClick={() => setMigrationLinkSupplied(!migrationLinkSupplied)}
              label="ALC Migration Team will supply a link for the migration agent that needs to be installed" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={syncValidated}
              checked={syncValidated}
              onClick={() => setSyncValidated(!syncValidated)}
              label="Validation of Sync. ALC Migration Team will validate that the agent has installed correctly, and that the system sync has started" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={screenshotsCaptured}
              checked={screenshotsCaptured}
              onClick={() => setScreenshotsCaptured(!screenshotsCaptured)}
              label="Baseline System Metrics. Capture screenshots of your baseline system metrics, before the migration has been scheduled" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={credentialsCreated}
              checked={credentialsCreated}
              onClick={() => setCredentialsCreated(!credentialsCreated)}
              label="Credentials Created. Temporary user access has been given to user Migration Ops Team Member. Credentials sent directly to (x) group" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={onboardingTrainingScheduled}
              checked={onboardingTrainingScheduled}
              onClick={() => setOnboardingTrainingScheduled(!onboardingTrainingScheduled)}
              label="Onboarding Training Schedule. Onboarding Training has been scheduled with all appropriate users of i-Vu Cloud" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={onboardingTrainingConducted}
              checked={onboardingTrainingConducted}
              onClick={() => setOnboardingTrainingConducted(!onboardingTrainingConducted)}
              label="Onboarding Training Conducted. Onboarding Training has been conducted, and i-Vu Customer Success Manager was included" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={customerHasPortalAccess}
              checked={customerHasPortalAccess}
              onClick={() => setCustomerHasPortalAccess(!customerHasPortalAccess)}
              label="Customer Portal Access. i-Vu cloud users have been identified, given credentials to the Customer Portal, and access has been verified" />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              value={syncComplete}
              checked={syncComplete}
              onClick={() => setSyncComplete(!syncComplete)}
              label="Sync Complete. ALC Migration team will verify that the Initial sync is complete" />
          </Form.Group>

          <div style={{ marginLeft: '40%' }}>

            {/* this to disable the submit button if checkbox is empty
      { iTSecurityDocReviewedAndApproved
        && outboundPortEnabled
        && certAuthIdentified
        && ivuProUpgraded
        && uSBRouterUpdated
        && userRouterUpdated
        && siteHasLocalBackeup
        && agentInstalled
        && migrationLinkSupplied
        && screenshotsCaptured
        && credentialsCreated
        && onboardingTrainingScheduled
        && onboardingTrainingConducted
        && customerHasPortalAccess
        && syncValidated
        && syncComplete ?
        <Button disabled={false} type="submit" onClick={submit} variant="danger" style={{width:'200px',margin:'5px'}}><i className="fas fa-save"></i> Submit</Button>
        :
        <Button disabled={true} type="submit" onClick={submit} variant="danger" style={{width:'200px',margin:'5px'}}><i className="fas fa-save"></i> Submit</Button>
        }
  */}
            <Button type="submit" onClick={submit} variant="danger" style={{ width: '200px', margin: '5px' }}><i className="fas fa-save"></i> Submit</Button>
            <Button type="reset" onClick={handleShow} variant="secondary" style={{ width: '200px' }}><i className="fas fa-sync-alt"></i> Reset</Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Reseting Field</Modal.Title>
              </Modal.Header>
              <Modal.Body>Reseting will reset all the fields. Are you sure you want to reset?</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={reset}>
                  Yes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>

          </div>
        </Form>
      </fieldset>
    </div>
  )
}

export default IvuChecklist
