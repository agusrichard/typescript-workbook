# TypeScript Clean Code and Best Practices

<br />

## List of Contents:
### 1. [TypeScript Best Practices 2021](#content-1)

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


## References:
- https://medium.com/@warkiringoda/typescript-best-practices-2021-a58aee199661
