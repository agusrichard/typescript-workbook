// ==================== Type Script Basics ====================
// let sekar = "Sekardayu Hana Pradiani"
// let areYouOk = false
// let diameter = 21

// const circ = (diameter: number) => {
//   return diameter * Math.PI
// }


// console.log(circ(diameter))


// ==================== Objects and Arrays ====================
// let arr0 = [1, 2, 3, 4, 5]
// console.log('arr0', arr0)
// arr0.push(5)
// // arr.push("sekar")
// // arr0[0] = 'saskia'

// let arr1 = ["sekar", "saskia", "sintya"]
// console.log('arr1', arr1)
// arr1.push('arifa')
// // arr1.push(0)
// // arr1[0] = 0

// let mixed = [0, 1, 'sekar', 2, 'saskia', 4, 5]
// console.log('mixed', mixed)
// mixed.push('sintya')
// mixed.push(0)

// let person = {
//   name: 'Agus',
//   age: 22
// }

// // person = "soemthing"
// // person.age = '22'
// // person.newAtt = 'something'
// // person = {
// //   name: 'agus',
// //   age: 22,
// //   friends: ['sekar', 'saskia']
// // }


// ==================== Explicit Types ====================
let sekar: string
let age: number
let amIGood: boolean

console.log(sekar, age, amIGood)

let names: string[]
names.push('sekar')
names.push('saskia')
// names.push(20)

let mixedArr: (string|number)[] = []
mixedArr.push('sekar')
mixedArr.push(20)

let uid: string|number = ''

// objects
let ninjaOne: object;
ninjaOne = { name: 'yoshi', age: 30 };

let ninjaTwo: {
  name: string,
  age: number,
  beltColour: string
};
ninjaTwo = { name: 'ken', age: 20, beltColour: 'black' };

