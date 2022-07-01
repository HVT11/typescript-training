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
enum UserResponse {
    No,
    Yes,
  }
   
function respond(recipient: string, message: UserResponse) {
    console.log(recipient, message)
}
   
respond("Princess Caroline", UserResponse.No);



