import { Invoice } from './classes/Invoice.js';
import { Payment } from './classes/Payment.js';
import { ListTemplate } from './classes/ListTemplate.js';
// const inv = new Invoice('agus', 'web work', 200)
// const pay = new Payment('sekar', 'marketting', 300)
// console.log(inv, pay)
// let invOne: HasFormatter
// let payOne: HasFormatter
// invOne = new Invoice('saskia', 'accounting', 100)
// payOne = new Payment('sintya', 'communicating', 150)
// console.log(invOne, payOne)
// const anchor = document.querySelector('a')!
// console.log(anchor.href)
const form = document.querySelector('.new-item-form');
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let doc;
    if (type.value === 'invoice') {
        doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
    }
    else {
        doc = new Payment(tofrom.value, details.value, amount.valueAsNumber);
    }
    list.render(doc, type.value, 'start');
});
