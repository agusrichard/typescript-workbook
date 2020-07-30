// Generics
// const addUID = (obj: object) => {
//   const uid = Math.floor(Math.random() * 1000000)
//   return {...obj, uid}
// }

// let docOne = addUID({ name: 'agus', age: 22})
// console.log(docOne.name)     // error

// const addUID = <T>(obj: T) => {
//   const uid = Math.floor(Math.random() * 1000000)
//   return {...obj, uid}
// }

// let docTwo = addUID({ name: 'sekar', age: 22 })
// console.log(docTwo.name)
// let something = addUID('hello')   // weird behavior
// console.log(something)

// const addUID = <T extends { name: string }>(obj: T) => {
//   const uid = Math.floor(Math.random() * 1000000)
//   return {...obj, uid}
// }

// let docThree = addUID({ name: 'saskia', age: 22 })
// console.log(docThree)

interface Resource<T> {
  uid: number|string,
  resourceName: string,
  data: T
}

const docFour: Resource<string> = {
  uid: 12901921,
  resourceName: 'sekardayu',
  data: 'Sekardayu Hana Pradiani'
}

const docFive: Resource<string[]> = {
  uid: 91919,
  resourceName: 'saskia',
  data: ['Saskia', 'Nurul', 'Azhima']
}

console.log(docFour)
console.log(docFive)