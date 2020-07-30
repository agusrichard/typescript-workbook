import { Invoice } from './classes/Invoice.js'
import { Payment } from './classes/Payment.js'
import { HasFormatter } from './interfaces/HasFormatter.js'
import { ListTemplate } from './classes/ListTemplate.js'


const form = document.querySelector('.new-item-form') as HTMLFormElement

const type = document.querySelector('#type') as HTMLSelectElement
const tofrom = document.querySelector('#tofrom') as HTMLInputElement
const details = document.querySelector('#details') as HTMLInputElement
const amount = document.querySelector('#amount') as HTMLInputElement

const ul = document.querySelector('ul')!
const list = new ListTemplate(ul)

form.addEventListener('submit', (event: Event) => {
  event.preventDefault()

  let values: [string, string, number]
  values = [tofrom.value, details.value, amount.valueAsNumber]

  let doc: HasFormatter
  if (type.value === 'invoice') {
    doc = new Invoice(...values)
  } else {
    doc = new Payment(...values)
  }

  list.render(doc, type.value, 'start')
})


// Tuples
let mixed = ['sekar', 22, true]
console.log(mixed)

let tup: [string, number, boolean]
tup = ['saskia', 20, true]
console.log(tup)