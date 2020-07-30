class Invoice {
  client: string
  details: string
  amount: number

  constructor(client: string, details: string, amount: number) {
    this.client = client
    this.details = details
    this.amount = amount
  }

  format() {
    return `${this.client} owes £${this.amount} for ${this.details}`
  }
}

const invOne = new Invoice('sekardayu', 'something', 200)
const invTwo = new Invoice('saskia', 'something', 140)

console.log(invOne, invTwo)

const invoices: Invoice[] = []
invoices.push(invOne)
invoices.push(invTwo)
console.log(invoices)