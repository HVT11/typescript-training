// Everyday Types
// Primitive Types
let text: string = 'Hello, World!'
let number: number = 5
let boolean: boolean = true

// Arrays
let listNumber: number[] = [1, 2, 3]

//Any
let anyType: any = 'Hello'
anyType = 5
anyType = {
    number: 1
}
anyType = [1,2,3]

//Functions
const greet = (name: string) => {
    console.log('Hello '+ name)
}

greet("Tri Huynh")

const numberToString = (number: number):string => {
    return ''+ number
}

console.log(typeof numberToString(3))

//Object Types
function printName(obj: { first: string; last?: string }) {
    // ...
}
  
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

//Union Type
function printId(id: number | string) {
    if (typeof id === "string") {
      // In this branch, id is of type 'string'
      console.log(id.toUpperCase());
    } else {
      // Here, id is of type 'number'
      console.log(id);
    }
}

printId(101)
printId("202")

//Interfaces
interface Point {
    x: number,
    y: number
}

function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x)
    console.log("The coordinate's y value is " + pt.y)
}

printCoord({x: 100, y: 100})

//Literal Types
let changingString = "Hello World"
changingString = "Olá Mundo"
console.log(changingString)

const req = { url: "https://example.com", method: "GET" } as const;

//Enums
//Numeric enums
enum UserResponse {
    No,
    Yes,
  }
   
function respond(recipient: string, message: UserResponse) {
    console.log(recipient, message)
}
   
respond("Princess Caroline", UserResponse.No);

//String Enums
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

//Constant and computed members
enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length,
}

// Enum at compile time
enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG,
  }
   
/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel
   
function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key]
    if (num <= LogLevel.WARN) {
      console.log("Log level key is:", key)
      console.log("Log level value is:", num)
      console.log("Log level message is:", message)
    }
}
printImportant("ERROR", "This is a message")

// Class
class Point1 {
    // readonly text: 'point'
    _length = 0;
    x: number
    y: number
    constructor(x: number, y:number) {
        this.x = x
        this.y = y
    }

    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    get length() {
        return this._length;
    }

    set length(value) {
        this._length = value;
    }

}

const pt = new Point1(5, 7)

//implements
interface A {
    x: number;
    y?: number;
}

class C implements A {
    x = 0;
}

//extends
class Animal {
    move() {
      console.log("Moving along!");
    }
}
   
class Dog extends Animal {
    woof(times: number): void {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }
}

//Member visibility
class Base {
    a = 10
    protected x = 1
    private c = 10
}

//Static members
class MyClass {
    static x = 0;
    static printX() {
      console.log(MyClass.x);
    }
}
console.log(MyClass.x);
MyClass.printX();

//Class Expressions
const someClass = class<Type> {
    content: Type;
    constructor(value: Type) {
      this.content = value;
    }
}

const m = new someClass("Hello, world");

//Relationships between classes
class Person {
    name: string;
    age: number;
}

class Employee {
    name: string;
    age: number;
    salary: number;
}

const p: Person = new Employee();
