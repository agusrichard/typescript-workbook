# TypeScript Clean Code and Best Practices

<br />

## List of Contents:
### 1. [TypeScript Best Practices 2021](#content-1)
### 2. [6 new TypeScript features for writing clean code](#content-2)

<br />

---

## Contents:

## [TypeScript Best Practices 2021](https://medium.com/@warkiringoda/typescript-best-practices-2021-a58aee199661) <span id="content-1"></span>

### 1. Use correct data type annotation ( avoid ‘any’ )
- Do not use ‘any’ keyword when you know what type of data your variable’s gonna hold.
- Snippet:
  ```typescript
  name: string = “Hello”;
  value: number = 50;
  isCorrect: boolean = false;
  ```

### 2. Enable strict check on
- Snippet tsconfig:<br />
  ![](https://miro.medium.com/max/1400/1*6NNYdRlo1spH1-71XtuGSg.png)


### 3. Use ‘let’ instead of ‘var’
- var is either a global scope or a local scope declaration. A var type variable becomes a globally scoped variable when it is defined outside a function/block.
- Snippet:
  ```typescript
  let name = "John";
      if (true) {
          let name = "Anne";
          console.log(name); // "Anne"
      }
      console.log(name); // "John"
  ```

### 4. Use ‘const’ for constants
- const came in to the picture together with let. const is also a blocked scope type. Also we cannot re-declare a const.
- Snippet:
  ```typescript
  const name = "John";
  name = "Anne";// error
  const age = 30;
  const age = 31; //error
  ```

### 5. Use tuples for fixed length arrays
- Snippet:
  ```typescript
  let marks:[number, number] = [1, 2]; // tuple of 2 number values
  marks = [10, 20]; // success
  marks = [1]; // syntax error
  marks = [1, 2, 3, 4, 5] // syntax error
  ```

### 6. Use type aliases in repetitive data types
- Snippet:
  ```typescript
  type Details = {name: string, age: number}; // defining type alias
  let man: Details = {name = "john", age=30}; // using type alias
  let woman: Details = {name = "Anne", age=32};
  ```

### 7. Decide between ‘any’ and ‘unknown’
- any and unknown does the same help if you look from the surface. They help you to easily refactor JS to TS when JS gives you no clue about the data types.
- Snippet:
  ```typescript
  let anyExample: any; // defining an any
  let unknownExample: unknown; // defining an unknown
  anyExample = 123; 
  anyExample = "Hey"
  unknownExample = false;
  unknownExample = 23.22;
  ```
  ```typescript
  anyExample.you.made.this.code.chain(); // success
  unknownExample.trim(); // syntax error
  ```

### 8. Use access modifiers for class members
- Snippet:
  ```typescript
  class Employee {
    protected name: string;
    private salary: number;
    
    constructor(name: string, salary: number) {
      this.name = name;
      this.salary = salary
    }

    public getSalary(){
      return salary
    }
  ```
  ```typescript
  class Developer extends Employee{
    viewDetails(){
      console.log(this.salary); // error: property 'name' is private
      console.log(this.getSalary()); // success
    }
  }
  ```
  ```typescript
  class Developer extends Employee{
    viewDetails(){
      console.log(this.name);
    }
  }
  ```

### 9. Avoid unnecessary comments
- Commenting is good as long as it is absolutely necessary. Always try to use intuitive names when naming variables and functions.

### 10. Use a Linter

### 11. Use a code formatter



**[⬆ back to top](#list-of-contents)**

<br />

---


## [6 new TypeScript features for writing clean code](https://itnext.io/6-new-typescript-features-for-writing-clean-code-ea7810cf5019) <span id="content-2"></span>

### Constructor shorthand with Parameter Properties
- This shorthand lets you declare class properties with the same names as the class constructor parameters. All you need to do is prefix your parameters with visibility modifiers.
- The usual way: <br />
  ![](https://miro.medium.com/max/700/1*h8GqW6QfVnOqf05ORcH2_w.png)
- The simplified way: <br />
  ![](https://miro.medium.com/max/700/1*pOEGCmKkoC4EhOlDIHh_dQ.png)

### Nullish coalescence
- Image: <br />
  ![](https://miro.medium.com/max/700/1*qBsVj7M7CSfqHfpevSjaPg.png)
- You might be wondering: “How is it different from the logic OR (||) operator"? The answer is that the nullish coalescing operator deals specifically with null and undefined values, while the OR operator will return the right-hand operand over any falsy value, including null, undefined, empty strings, and zeros.

### Private Class Fields
- To declare a private class field, you use # syntax: <br />
  ![](https://miro.medium.com/max/700/1*YI-JPhucLX6Vv5VYAkKXKQ.png)
- The difference between using private class fields over the private keyword is that the former has better run-time guarantees. 
- TypeScript fields declared with a private keyword will become regular fields in the compiled JavaScript code. Private class fields, on the other hand, will stay private in the compiled code.
- Trying to access private class fields during the run time will result in a syntax error. It also means that people can’t inspect and snoop at your private class fields using browser dev tools.

### Labeled tuple types
- Tuples are array types of fixed size. Tuples must have their types declared, although the types do not need to be all same. Here’s a sample tuple type declaration: <br />
  ![](https://miro.medium.com/max/700/1*xLJ0-87KwMIh47oSQJzCnQ.png)
- So why use labeled tuple types? Primarily you get a much nicer auto-complete experience when working with functions and spread operators: <br />
  ![](https://miro.medium.com/max/700/1*spdOI_Zjy5Ghc6w_1Oelmg.png)
  ![](https://miro.medium.com/max/700/1*j78O3-1k18iVF5dClryVmQ.png)


### Template type literals
- Image: <br />
  ![](https://miro.medium.com/max/700/1*WlNxukeQVthWP_6bQZGREw.png)

### Utility types
- Here is an example of using the Omit utility that copies all of the props from the original type except for the ones you chose not to include: <br />
  ![](https://miro.medium.com/max/700/1*uitrTs_kIshjwJGsC2S5fg.png)

**[⬆ back to top](#list-of-contents)**

<br />

---

## References:
- https://medium.com/@warkiringoda/typescript-best-practices-2021-a58aee199661
- https://itnext.io/6-new-typescript-features-for-writing-clean-code-ea7810cf5019
