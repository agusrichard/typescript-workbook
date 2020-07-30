class Invoice {
  // readonly client: string
  // private details: string
  // public amount: number

  constructor(
    readonly client: string,
    private details: string,
    public amount: number
  ) {}

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

invoices.forEach(inv => {
  console.log(inv.format())
})