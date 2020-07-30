import { Invoice } from './classes/Invoice.js';
const invOne = new Invoice('sekardayu', 'something', 200);
const invTwo = new Invoice('saskia', 'something', 140);
console.log(invOne, invTwo);
const invoices = [];
invoices.push(invOne);
invoices.push(invTwo);
console.log(invoices);
invoices.forEach(inv => {
    console.log(inv.format());
});
