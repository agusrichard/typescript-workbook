import { Invoice } from './classes/Invoice.js'
import { Payment } from './classes/Payment.js'
import { HasFormatter } from './interfaces/HasFormatter.js'

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

const form = document.querySelector('.new-item-form') as HTMLFormElement

const type = document.querySelector('#type') as HTMLSelectElement
const tofrom = document.querySelector('#tofrom') as HTMLInputElement
const details = document.querySelector('#details') as HTMLInputElement
const amount = document.querySelector('#amount') as HTMLInputElement

form.addEventListener('submit', (event: Event) => {
  event.preventDefault()
  let doc: HasFormatter
  if (type.value === 'invoice') {
    doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber)
  } else {
    doc = new Payment(tofrom.value, details.value, amount.valueAsNumber)
  }

  console.log(doc)
})