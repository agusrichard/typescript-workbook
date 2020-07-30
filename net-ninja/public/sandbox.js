"use strict";
// ==================== Function Basics ==================
// let greet: Function
// greet = () => {
//   console.log('Hello there, General Kenobi')
// }
// greet()
// let add = (x: number, y: number) => {
//   console.log(x + y)
// }
// let add = (x: number, y: number, z?: number|string) => {
//   console.log(x + y)
// }
// let add = (x: number, y: number, z: number|string = 10) => {
//   console.log(x + y)
//   console.log(z)
// }
// add(1, 2)
// add(1, '2')
// function subtract(a: number, b: number) {
//   return a + b
// }
// function subtract(a: number, b: number): number {
//   return a + b
// }
// let result: number = subtract(1, 2)
// console.log(result)
// // result = 'sekar'
// ==================== Type Aliases ==================
// type NumOrStr = number | string
// type Obj = { name: string, age: NumOrStr }
// function logging(one: number, two: NumOrStr) {
//   console.log(one)
//   console.log(two)
// }
// function greet(user: Obj) {
//   console.log(user.name + ' nice to meet you')
// }
// ==================== Function Signatures ==================
var greet;
greet = function (name, greeting) {
    console.log(name + " says " + greeting);
};
greet('sekar', 'hoooo');
var calc;
calc = function (x, y, opType) {
    if (opType === 'add') {
        return x + y;
    }
    else if (opType === 'subtract') {
        return x - y;
    }
    else {
        return 'I am sorry, what do you mean?';
    }
};
console.log(calc(1, 2, 'subtract'));
