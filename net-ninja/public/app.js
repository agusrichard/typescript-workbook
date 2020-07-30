"use strict";
// const anchor = document.querySelector('a')!
// console.log(anchor.href)
// const form = document.querySelector('form')!
var form = document.querySelector('.new-item-form');
// console.log(form.children)
var type = document.querySelector('#type');
var tofrom = document.querySelector('#tofrom');
var details = document.querySelector('#details');
var amount = document.querySelector('#amount');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(type.value, tofrom.value, details.value, amount.valueAsNumber);
});
