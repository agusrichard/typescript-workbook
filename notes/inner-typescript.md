# TypeScript Clean Code and Best Practices

<br />

## List of Contents:

### 1. [How To Use Basic Types in TypeScript](#content-1)

<br />

---

## Contents:

## [How To Use Basic Types in TypeScript](https://www.digitalocean.com/community/tutorials/how-to-use-basic-types-in-typescript) <span id="content-1"></span>

### Declaring Variable Types in TypeScript

- You create the variables and assign them a value, but do not specify a type, as shown in the following:
  ```javascript
  const language = {
    name: "JavaScript",
  };
  ```
- In this code block, language is an object that holds a string value for the property name. The value type for language and its properties is not explicitly set, and this could cause confusion later if future developers do not know what kind of value language references.
- TypeScript has as a main benefit a strict type system. A statically typed language is one where the type of the variables is known at compilation time.
- Types are extra information that you write directly in your code. The TypeScript compiler uses this extra information to enforce the correct use of the different values depending on their type.
- Pattern of variable declaration:
  ```text
  declarationKeyword variableName: Type
  ```
- declarationKeyword would be something like let, var, or const. This would be followed by the variable name, a colon (:), and the type of that variable.
- If you explicitly set the type of a variable then use a different type as its value, the TypeScript Compiler (tsc) or your editor will show the error 2322. Try running the following:
  ```typescript
  const myNumber: number = "look! this is not a number :)";
  ```
- The above will yield an error:
  ```text
  Output
  Type 'string' is not assignable to type 'number'. (2322)
  ```

### Basic Types Used in TypeScript

- string
  ```typescript
  const language: string = "TypeScript";
  const message: string = `I'm programming in ${language}!`;
  ```
- boolean
  ```typescript
  const hasErrors: boolean = true;
  const isValid: boolean = false;
  ```
- number:
  ```typescript
  const pi: number = 3.14159;
  const year: number = 2021;
  ```
- bigint:
  - The type bigint is a type that can be used when targeting ES2020. It’s used to represent BigInt, which is a new datatype to store integers bigger than 2^53.
  - Code:
    ```typescript
    const bigNumber: bigint = 9007199254740993n;
    ```
- symbol
  - The symbol type is used to represent the Symbol primitive value. This will create a unique, unnamed value.
  - The uniqueness of these values can be used to avoid reference collisions.
  - Code:
    ```typescript
    const mySymbol: symbol = Symbol("unique-symbol-value");
    ```
- Arrays
  - Appending [] to the expected type of the array elements. For example, if you want to type an array that holds multiple number values, you could do it like this:
    ```typescript
    const primeNumbers: number[] = [2, 3, 5, 7, 11];
    ```
  - Using the Array<T> Generic, where T is the expected type of the elements in that array. Using the previous example, it would become this:
    ```typescript
    const primeNumbers: Array<number> = [2, 3, 5, 7, 11];
    ```
  - TypeScript is not able to infer the correct type expected by this array. Instead, it uses any[], which means an array of anything. This is not type-safe, and could cause confusion later in your code.
    ```typescript
    const arr = [];
    ```
- Tuples
  - Tuples are arrays with a specific number of elements. One common use-case for this is storing 2D coordinates in the format [x, y]. If you are working with React and using Hooks, the result from most Hooks is also a tuple, like const [isValid, setIsValid] = React.useState(false).
  - To type a tuple, as opposed to when typing an array, you wrap the type of the elements inside a [], separating them with commas. Imagine you are creating a literal array with the types of the elements:
    ```typescript
    const position: [number, number] = [1, 2];
    ```
- any

  - Using any means opting-out of type checking, and is the same as making the TypeScript Compiler ignore that value.
  - Code:

    ```typescript
    let thisCanBeAnything: any = 12345;

    thisCanBeAnything = "I can be anything - Look, I'm a string now";

    thisCanBeAnything = [
      "Now I'm an array - This is almost like pure JavaScript!",
    ];
    ```

- unknown
  - The unknown type is like a type-safe counterpart of the any type. You can use unknown when you want to type something that you can not determine the value of, but still want to make sure that any code using that value is correctly checking the type before using it. This is useful for library authors with functions in their library that may accept a broad range of values from their users and do not want to type the value explicitly.
  - If later in the code you want to compare that value against some other number, TypeScript compiler will display error.
  - Manual type-checking:
    ```typescript
    if (typeof code === "number") {
      const isCodeGreaterThan100 = code > 60;
      // ...
    } else {
      throw new Error("Invalid value received as code");
    }
    ```
  - In this example, you are checking if code is a number using the typeof operator. When you do that, TypeScript is going to coerce the type of your variable to number inside that if block, because at runtime the code inside the if block is only going to be executed if code is currently set to a number. Otherwise, you will throw a JavaScript error saying that the value passed is invalid.
  - To understand the differences between the unknown and any types, you can think of unknown as “I do not know the type of that value” and any as “I do not care what type this value holds”.
- void

  - You can use the void type to define the variable in question as holding no type at all. If you assign the result of a function that returns no value to a variable, that variable is going to have the type void.

    ```typescript
    function doSomething() {}

    const resultOfVoidFunction: void = doSomething();
    ```

- null and undefined
  - Code:
    ```typescript
    const someNullField: null = null;
    const someUndefinedField: undefined = undefined;
    ```
- never
  - The never type is the type of a value that will never exist. For example, imagine you create a numeric variable:
    ```typescript
    const year: number = 2021;
    ```
  - The type of the variable year inside that if block is going to be never. This is because, since year is typed as number, the condition for this if block will never be met. You can think of the never type as an impossible type because that variable can’t have a value at this point.
- object:
  - The object type represents any type that is not a primitive type. This means that it is not one of the following types
    - number
    - string
    - boolean
    - bigint
    - symbol
    - null
    - undefined
  - The object type is commonly used to describe object literals because any object literal can be assigned to it:
    ```typescript
    const programmingLanguage: object = {
      name: "TypeScript",
    };
    ```

**[⬆ back to top](#list-of-contents)**

<br />

---

## References:

- https://www.digitalocean.com/community/tutorials/how-to-use-basic-types-in-typescript
