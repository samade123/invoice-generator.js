/**
 * Input prompt example
 */

 'use strict';
 const inquirer = require('inquirer');
 
 const questions = [
   {
     type: 'input',
     name: 'fullName',
     message: "What's your full name?",
   },
   {
     type: 'input',
     name: 'address',
     message: "enter your address?",
     default() {
       return 'Doe';
     },
   },
   {
     type: 'input',
     name: 'postcode',
     message: "enter your postcode",
   },
 ];
 
 inquirer.prompt(questions).then((answers) => {
   console.log(JSON.stringify(answers, null, '  '));
 });