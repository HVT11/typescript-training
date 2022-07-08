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

//greet("Tri Huynh")

const numberToString = (number: number):string => {
    return ''+ number
}

//console.log(typeof numberToString(3))

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

//printId(101)
//printId("202")

//Interfaces
interface Point {
    x: number,
    y: number
}

function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x)
    console.log("The coordinate's y value is " + pt.y)
}

//printCoord({x: 100, y: 100})

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
//printImportant("ERROR", "This is a message")

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
//console.log(MyClass.x);
//MyClass.printX();

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

//Variable declarations
//Destructuring

//Array destructuring
let input = [1, 2];
let [firstI, secondI] = input;
//console.log(firstI); // outputs 1
//console.log(secondI); // outputs 2

//Tuple destructuring
let tuple: [number, string, boolean] = [1, "hello", true];
let [a, b, c] = tuple; // a: number, b: string, c: boolean

//Object destructuring
let o = {
    x: "foo",
    y: 12,
    z: "bar",
  };
let { x, y } = o;

//Function destructuring
type D = { a1: string; b1?: number };
function f({ a1, b1 }: D): void {
  // ...
}

//Spread
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5]

//Spread Object
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };

//Generics
function identity<Type>(arg: Type): Type {
    return arg;
}

//Generics Types
let myIndentify: {<Type>(arg: Type): Type} = identity

//Generics classes
class GenericNumber<Type> {
    zeroValue: Type;
    add: (x: Type, y: Type) => Type;
}
   
let myGenericNumber = new GenericNumber<string>();
myGenericNumber.add = function (x, y) {
    return x + y;
}

//console.log(myGenericNumber.add('x', 'y'))

//Generic constrainst
interface Lengthwise {
    length: number;
}
   
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length);
    return arg;
}

loggingIdentity({length: 10, value : 10})

//Class types in generic
class BeeKeeper {
    hasMask: boolean = true;
}
   
class ZooKeeper {
    nametag: string = "Mikle";
}

class Animals {
    numLegs: number = 4
}

class Bee extends Animals {
    keeper: BeeKeeper = new BeeKeeper()
}

class Lion extends Animals {
    keeper: ZooKeeper = new ZooKeeper() 
}

function createInstance<Class extends Animals>(c: new() => Class): Class {
    return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask

//Utility Type
//Partial<Type>
interface Todo {
    title: string
    description: string
    completed: string
}
   
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate }
}
   
const todo1 = {
    title: "organize desk",
    description: "clear clutter",
    completed: 'a'
}

const todo2 = updateTodo(todo1, {
    description: "throw out trash",
})

//Required<Type>
interface Props {
    a?: number;
    b?: string;
}

const obj2: Required<Props> = { a: 5, b: 'b'};

//Readonly<Type>
const todo: Readonly<Todo> = {
    description: "abc",
    title: "Delete inactive users",
    completed: 'a'
}

//Record<Keys, Type>
interface CatInfo {
    age: number
    breed: string
}
   
type CatName = "miffy" | "boris" | "mordred"
   
const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
}

//Pick<Type, Keys>
type TodoPreview1= Pick<Todo, "title" | "completed">

const todoPreview: TodoPreview1 = {
    title: 'abc',
    completed: 'x',
}

//Omit<Type, Keys>
type TodoPreview2 = Omit<Todo, "completed">;
const todoPreview2: TodoPreview2 = {
    title: 'abc',
    description: 'abc'
}

//Exclude<UnionType, ExcludedMembers>
type T0 = Exclude<"a" | "b" | "c", "a">

//Extract<Type, Union>
type T1 = Extract<"a" | "b" | "c", "a" | "f">

//NonNullable<Type>
type T2 = NonNullable<string[] | null | undefined>

//Parameters<Type>
type T3 = Parameters<() => string>

//ConstructorParameters<Type>
type T4 = ConstructorParameters<ErrorConstructor>

//ReturnType<Type>
type T5 = ReturnType<() => string>

//InstanceType<Type>
class E {
    x = 0;
    y = 0;
  }
   
type T6 = InstanceType<typeof E>

//ThisParameterType<Type>
function toHex(this: Number) {
    return this.toString(16);
}
   
function numberToString1(n: ThisParameterType<typeof toHex>) {
    return toHex.apply(n);
}

//OmitThisParameter<Type>
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
console.log(fiveToHex());

//ThisType<Type>
type ObjectDescriptor<D, M> = {
    data?: D
    methods?: M & ThisType<D & M> // Type of 'this' in methods is D & M
}

//Decorators
function defirst() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("first(): called");
    };
}
   
function desecond() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("second(): called");
    };
}
   
class ExampleClass {
    //@defirst()
    //@desecond()
    //method() {}
}

//Class decorator
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      reportingURL = "http://www...";
    };
}
   
@reportableClassDecorator
class BugReport {
    type = "report";
    title: string;
   
    constructor(t: string) {
      this.title = t;
    }
}
   
const bug = new BugReport("Needs dark mode");
console.log(bug.title) // Prints "Needs dark mode"
console.log(bug.type) // Prints "report"

//Method decorator
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.enumerable = value;
    };
}

class Greeter {
    greeting: string;
    constructor(message: string) {
      this.greeting = message;
    }
   
    @enumerable(false)
    greet() {
      return "Hello, " + this.greeting;
    }
}
