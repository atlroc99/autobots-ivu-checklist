let checklist = [
    {
        id: 1,
        name: 'iTSecurityDocReviewedAndApproved',
        isChecked: false,
        label: 'IT security documents on BACnet/SC & i-Vu® Cloud reviewed and approved'
    },
    {
        id: 2,
        name: 'outboundPortEnabled',
        isChecked: false,
        label: 'Outbound Port availability (port 443 as default) enabled. (Following the IT Security documents listed above, BACnet/SC requires outbound communication to the cloud hosted BACnet/SC hub. If IT requires the i-Vu® Service URL to be whitelisted, note this on the provisioning form when ordering the license.)'
    },
    {
        id: 3,
        name: 'certAuthIdentified',
        isChecked: false,
        label: 'Certificate authority identified which will be used to generate BACnet/SC certificates'
    }
];


// const printItemProp = (item)=> {
//     console.log(typeof item)
//     console.log(item);
// }

// items.items.map(item => {
//     console.log(typeof {...item});
//     printItemProp({...item})
// });

const checkedItem = {
    id: 3,
    name: 'certAuthIdentified',
    isChecked: true,
    label: 'Certificate authority identified which will be used to generate BACnet/SC certificates'
};

let localCheckslist = checklist;
console.log('old checklist:', checklist)
localCheckslist.forEach(item => {
    if (item.name == checkedItem.name) {
        console.log('item1', item)
        item = {...checkedItem}
        console.log('item2', item)
        localCheckslist.push(item)
    }
});

checklist = localCheckslist;
console.log('new checklist:', checklist)
