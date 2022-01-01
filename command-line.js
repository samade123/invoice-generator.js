/**
 * Input prompt example
 */

'use strict';
const inquirer = require('inquirer');
const {updateInvoiceDetails} = require('./invoice.js');


var data = {
    fromAddress: {},
    toAddress: {},
    items: [{},],
}

function fromAddressQuestions() {

    const questions = [
        {
            type: 'input',
            name: 'fullName',
            message: "What's your full name?",
            default() {
                return 'Liam';
            },
        },
        {
            type: 'input',
            name: 'address',
            message: "enter your address?",
            default() {
                return 'Captains Cottage, New Road, St Blazey';
            },
        },
        {
            type: 'input',
            name: 'postcode',
            message: "enter your postcode",
            default() {
                return 'PL24 2SB';
            },
        },
    ];

    inquirer.prompt(questions).then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));

        data.fromAddress = answers;
        toAddressQuestions();
    });
}


function toAddressQuestions() {

    const questions = [
        {
            type: 'input',
            name: 'fullName',
            message: "What's the invoicee full name?",
            default() {
                return 'Tom';
            },
        },
        {
            type: 'input',
            name: 'address',
            message: "enter the invoicee's address?",
            default() {
                return '12 Church Lane, Kirton';
            },
        },
        {
            type: 'input',
            name: 'postcode',
            message: "enter the invoicee's  postcode",
            default() {
                return 'PE20 1EL';
            },
        },
    ];

    inquirer.prompt(questions).then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));

        data.toAddress = answers;
        itemQuestions();
    });
}

function itemQuestions() {

    const questions = [
        {
            type: 'input',
            name: 'item',
            message: "what are you billing them for?",
            default() {
                return 'Tesco';
            },
        },
        {
            type: 'input',
            name: 'price',
            message: "how much did it cost?",
            default() {
                return '9.81';
            },
        },
        {
            type: 'input',
            name: 'currency',
            message: "in what currency?",
            default() {
                return 'gbp';
            },
        },
    ];

    inquirer.prompt(questions).then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));

        data.items[0] = answers;

        console.log(data)

        updateInvoiceDetails(data)

        
    });
}


fromAddressQuestions();