const CHECKLIST = {
    "dealerName": "temp systems madison, wi (id) (ec600)",
    "checklists": [
        {
            "id": 1,
            "name": "iTSecurityDocReviewedAndApproved",
            "isChecked": true,
            "label": "IT iVU® documents on BACnet/SC & iVU® Cloud reviewed and approved"
        },
        {
            "id": 2,
            "name": "outboundPortEnabled",
            "isChecked": false,
            "label": "Outbound Port iVU® (port 443 as default) enabled. (Following the IT Security documents iVU® above, BACnet/SC requires outbound communication to the cloud hosted BACnet/SC hub. If IT requires the iVU® Service URL to be whitelisted, note this on the provisioning form when ordering the license.)"
        },
        {
            "id": 3,
            "name": "certAuthIdentified",
            "isChecked": true,
            "label": "Certificate authority iVU® identified which will be used to iVU® generate BACnet/SC certificates"
        }
    ],
    "serialNumber": "I201301217",
    "accountNumber": "",
    "endCustomerCompany": "Temperature Sytems, Inc",
    "uiTheme": "rgb(26,112,203)",
    "isCompleted": false,
    "migrationDate": "2021-10-31T04:00:00.000Z",
    "migrationDateStr": "Sun Oct 31 2021",
    "migrationDateEpoch": 1635652800
}
export default CHECKLIST;

// const printItemProp = (item)=> {
//     console.log(typeof item)
//     console.log(item);
// }

// items.items.map(item => {
//     console.log(typeof {...item});
//     printItemProp({...item})
// });

// const checkedItem = {
//     id: 3,
//     name: 'certAuthIdentified',
//     isChecked: true,
//     label: 'Certificate authority identified which will be used to generate BACnet/SC certificates'
// };

// let localCheckslist = checklist;
// console.log('old checklist:', checklist)
// localCheckslist.forEach(item => {
//     if (item.name == checkedItem.name) {
//         console.log('item1', item)
//         item = {...checkedItem}
//         console.log('item2', item)
//         localCheckslist.push(item)
//     }
// });

// checklist = localCheckslist;
// console.log('new checklist:', checklist)
