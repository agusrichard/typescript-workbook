"use strict";
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
var Resourcetype;
(function (Resourcetype) {
    Resourcetype[Resourcetype["BOOK"] = 0] = "BOOK";
    Resourcetype[Resourcetype["AUTHOR"] = 1] = "AUTHOR";
    Resourcetype[Resourcetype["FILM"] = 2] = "FILM";
    Resourcetype[Resourcetype["DIRECTOR"] = 3] = "DIRECTOR";
    Resourcetype[Resourcetype["PERSON"] = 4] = "PERSON";
})(Resourcetype || (Resourcetype = {}));
const docFour = {
    uid: 12901921,
    resourceName: Resourcetype.AUTHOR,
    data: 'Sekardayu Hana Pradiani'
};
const docFive = {
    uid: 91919,
    resourceName: Resourcetype.DIRECTOR,
    data: ['Saskia', 'Nurul', 'Azhima']
};
console.log(docFour);
console.log(docFive);
