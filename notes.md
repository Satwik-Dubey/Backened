// Node js basics

// Node js is a runtime environment for executing JavaScript code outside of a web browser. 

// It provides a platform for running JavaScript programs on the server side, 
// enabling the development of server-side applications using JavaScript.


// protocols means rules

// HTTP & HTTP

----------------------------------------------------------------------------------------------------------------------
### Express.js Framework-> it is a npm package 

*** Express.js*** is a popular web framework for building web applications in Node.js. It provides a set of features for handling HTTP requests and responses, routing, middleware, and more.

// Key Features:
// Routing: Express.js allows you to define routes for different HTTP methods (GET, POST, etc.) and URLs.
// Middleware: Express.js provides a middleware system that allows you to add functions that run before or after certain parts of the request-response cycle.   
// Templating: Express.js supports various templating engines like EJS, Pug, and Handlebars.


// difference between framework and library

// Framework: A framework is a collection of tools and libraries that provide a structure and guidelines for building applications.

// Library: A library is a collection of reusable components, functions, or classes that can be used in different projects.


const express =require('express');
const app=express(); // jo express kar sakta h vo sab app kar sakta h

// this is middleware   
// flow of code
// request -> middleware -> response
//  request middleware pe jayegi fir next usko aage karega aur fir wo seedha route pe jaayegi jo route keh rha hoga


app.use((req,res,next)=>{
    console.log(" this is middleware"); 
    next();
});

app.get('/',(req,res)=>{
    res.send("hello");
})
app.listen(3000);


// Routes-> anything after domain name is called route
//  eg: abc.com/profile

// Middlware-> anything between domain name and route is called middleware
//  jab bhi  server request karta h waha se route ke beech pauchne tak agar ham us request ko beech m rokhte ho aur kuch perform karte ho, to ye element middleware kehlata h

// error handling

app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send("something went wrong");
});

 ---------------------------------------------------------------------------------------------------------


// Form handling and working with the forms

// handle backened process of forms and making sure the data coming from any frontened lib,fw,templating engines, we still handle it in the backened

const express=require('express');
const app=express();


// humlog kuch bhi data frontened par browser par rakh sakte h and jab bhi aap kuch bhi raved data automatically backened par chala jayegaequest backened par karoge wo frontened par s


// Sessions-> a session is a server side storage of information that is associated with a particular user. it is used to store data that is required between multiple requests, such as user preferences, login information, etc.

// Cookies -> Cookies are small pieces of data stored on the client-side, typically used to remember information about the user or their session. They can store data like user preferences, session identifiers, and other information required for the functioning of web applications.


//  ham bhejte h plain text par server ko mila h blob which is not directly readable 
// ab is cheez ko handle karne k liye hum middleware use kar sakte h
// neeche jo do line h vo usi ke liye h


app.use(express.json()); // ye line json data ko parse karega
app.use(express.urlencoded({extended:true}));

----------------------------------------------------------------------------------------------------------------------






