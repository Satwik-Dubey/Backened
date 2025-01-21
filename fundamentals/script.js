
//Arrow Function

// 1. Syntax

// normal syntax
function sayHello(){
    console.log("Hello");
}
sayHello


//arrow syntax

const sayHello = () => {
    console.log("Hello");
}
sayHello


const add=(a,b)=>{
    return a+b;
}

// if function has no body

const sayHello = () => console.log("Hello");// for one liner


// 2.Arguments keyword

const logArgs = (...args) => {
    console.log(args);
}

// The spread operator in JavaScript, represented by ..., is used to "spread" or expand elements of an array, object, or iterable into individual elements.

// Key Features:
// Syntax: ...array or ...object
// Purpose:
// To unpack elements from arrays or properties from objects.
// To create shallow copies or merge arrays/objects.
// Common Use Cases:
// Expanding elements.
// Combining arrays or objects.
// Passing arguments to functions.

// 3. Hoisting

// Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during compilation.
const sayHey=()=>{
    console.log("hey");
}
sayHey();

// 4. This Keyword

// The this keyword refers to the object that is executing the current function.


// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// sync in js
// -> synchronous -> line by line execution
// ->async -> non blocking ->  due to sync programming sometimes imp instructions get blocked due to some previous instructions,which causes a delay in the execution of the program. and there comes asynchronus -> it allows us to exexcute next instructions immediately and does not block the flow

// callback example
function sum(a,b){
    console.log(a+b);
}
function calculator(a,b,sumcallback){
    sumcallback(a,b);
}
calculator(2,4,sum);

// Execution Flow
// calculator(2, 4, sum) is called.
// Inside calculator:
// The sumcallback function is called as sumcallback(2, 4).
// Since sumcallback refers to the sum function, this is equivalent to sum(2, 4).
// Inside sum:
// a + b is calculated as 2 + 4 = 6.
// console.log(6) is executed, and 6 is printed to the console.
// Output
// 6

//  this is example of synchronus callback

// example of async callback

const hello=()=>{
    console.log("hello");
}
setTimeout(hello,2000);

// setTimeout is a built-in JavaScript function that takes two arguments:

// Callback function (hello): The function to be executed after the delay.
// Delay (2000): The time in milliseconds before the callback function is executed. Here, 2000 milliseconds equals 2 seconds.

// Execution Flow
// The hello function is defined but not called immediately.
// setTimeout is invoked with hello as the callback and a delay of 2000 milliseconds (2 seconds).
// After 2 seconds, the JavaScript engine executes the hello function, which logs "hello" to the console.


// You can also use an inline function directly:

setTimeout(() => {
    console.log("hello");
}, 2000);
// This works the same way.

// eg-3
function sum(a,b){
    console.log(a+b);
}
function calculator(a,b,sumcallback){
    setTimeout(() => {
        sumcallback(a,b);
    }, 2000);
}
calculator(2,4,sum);

// define calculator function ->

// calculator takes three arguments:

// a - The first number.
// b - The second number.
// sumcallback - A callback function that will be executed later.
// Inside calculator, the setTimeout function is used to delay the execution of the sumcallback function by 2000 milliseconds (2 seconds).

// The setTimeout call takes two arguments:

// An arrow function: This function executes sumcallback(a, b) after the delay.
// Delay (2000 ms): Specifies the time to wait before calling the arrow function.

// Execution Flow
// The calculator function is called.
// Inside calculator, setTimeout schedules the sumcallback (which is sum) to execute after 2000 milliseconds.
// The program continues executing other code (if any) without waiting for the timeout to finish.
// After 2 seconds, the setTimeout triggers the arrow function:
// javascript
// Copy
// Edit
// sumcallback(a, b); // Equivalent to sum(2, 4)
// The sum function executes, logging 2 + 4 = 6 to the console.

// eg-4 

// Updated Code:

function sum(a, b) {
    console.log(a + b);
}

function calculator(a, b, sumcallback) {
    setTimeout(() => {
        sumcallback(a, b); // Executes after 2 seconds
    }, 2000);

    // Additional synchronous code runs immediately
    console.log("Waiting for the sum to be calculated...");
    for (let i = 0; i < 5; i++) {
        console.log(`Processing item ${i + 1}`);
    }
}

// Calling the calculator function
calculator(2, 4, sum);
console.log("This code runs immediately after calling calculator.");


// Explanation of Changes:
// Synchronous Code Before setTimeout:

// Added console.log("Waiting for the sum to be calculated...") to print a message while waiting for the setTimeout delay.
// Added a for loop to simulate other operations running immediately.
// Asynchronous Execution:

// The setTimeout schedules the execution of the sumcallback after 2 seconds.
// Meanwhile, the synchronous code (like the for loop and additional console.log) runs without waiting for the timeout to finish.
// Immediate Code After calculator Call:

// Added console.log("This code runs immediately after calling calculator."); after calling calculator to show the asynchronous nature of the program.
// Output:

// Waiting for the sum to be calculated...
// Processing item 1
// Processing item 2
// Processing item 3
// Processing item 4
// Processing item 5
// This code runs immediately after calling calculator.
// 6
// The first part of the output is generated immediately by the synchronous code.
// After a 2-second delay, the sumcallback function (sum) executes and logs 6.
// Key Concepts Demonstrated:
// Asynchronous Behavior: The code after setTimeout doesn't block the program, so other code executes immediately.
// Event Loop: The setTimeout callback (sum) is placed in the message queue and executed only after the delay and when the call stack is clear.
// Concurrency: Simulating simultaneous operations using synchronous and asynchronous logic.



// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Callback Hell

// 1. Callback hell is a pattern in JavaScript where multiple nested callbacks are used to handle asynchronous operations, leading to a complex and difficult to maintain codebase.
// 2. Callback hell can make the code difficult to read, understand, and maintain, especially when handling multiple asynchronous operations.
// 3. Callback hell can lead to code that is difficult to test, debug, and maintain.

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Promises

// 1. A Promise is an object that represents the eventual completion or failure of an asynchronous operation.
// 2. A Promise can be in one of three states: pending, fulfilled(resolved), or rejected.
// 3. A Promise is created using the Promise constructor, which takes a callback function as an argument.
// 4. The callback function is executed when the Promise is created, and it can resolve or reject the Promise.
// 5. A Promise can be used to handle asynchronous operations and provide a more readable and maintainable codebase.    

//  it is a solutoion of callback hell

// let promise=new Promise((resolve,reject)=>{...})

// *resolve and reject are callbacks provided with JS

















































//High order function -> a function that takes a function as an argument 

function add(a,b){
    return a+b;
}
console.log(add(2,3));
// high order 

function add(a,b,cb){
    let result=a+b;
    cb(result);
}

add(2,4 function (val){
    console.log(val);
})

// yha pe add ek high order function h