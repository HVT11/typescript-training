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
//