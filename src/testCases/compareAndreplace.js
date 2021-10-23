//compre two lists containing objects and replace if there is a match found

const dealer_checklist = [
    {
        "id": 1,
        "name": "iTSecurityDocReviewedAndApproved",
        "isChecked": true,
        "label": "IT WebCTRL® documents on BACnet/SC & WebCTRL® Cloud reviewed and approved"
    },
    {
        "id": 2,
        "name": "outboundPortEnabled",
        "isChecked": true,
        "label": "Outbound Port WebCTRL® (port 443 as default) enabled. (Following the IT Security documents WebCTRL® above, BACnet/SC requires outbound communication to the cloud hosted BACnet/SC hub. If IT requires the WebCTRL® Service URL to be whitelisted, note this on the provisioning form when ordering the license.)"
    },
    {
        "id": 3,
        "name": "certAuthIdentified",
        "isChecked": true,
        "label": "Certificate authority WebCTRL® identified which will be used to WebCTRL® generate BACnet/SC certificates"
    }
]

const tempChecklist = [
    {
        "id": 1,
        "name": "iTSecurityDocReviewedAndApproved",
        "isChecked": true,
        "label": "Micky Mouse In the House"
    },
    {
        "id": 2,
        "name": "outboundPortEnabled",
        "isChecked": true,
        "label": "Jon Doe vod Doe"
    },  
]

dealer_checklist.forEach(dealerItem => {
    tempChecklist.forEach(tempItem => {
        console.log(`COMPARING: ${dealerItem.name} === ${tempItem.name}: ${(dealerItem.name === tempItem.name)} `)
       if (dealerItem.name === tempItem.name) {
           dealerItem['label'] = tempItem.label
       }
    })
});

console.log('\nUPDATED DEALER:');
console.log(dealer_checklist)
console.log(`total_dealer-Checklist ${dealer_checklist.length}`);