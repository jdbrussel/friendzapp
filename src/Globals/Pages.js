const Pages = [];

Pages.push({
    name: 'user',
    title: 'Account',
    pathname: '/user',
    modal: false,
    icon: 'UserIcon',
    subpages: [],
    footer: true
});

Pages.push({
    name: 'cards',
    title: 'Spaarkaarten',
    pathname: '/cards',
    modal: false,
    icon: 'CreditCardIcon',
    subpages: [],
    footer: true
});

Pages.push({
    name: 'scanner',
    title: 'Scanner',
    pathname: false,
    modal: 'scanner',
    icon: 'QrCodeIcon',
    subpages: [],
    footer: true
});


export default Pages