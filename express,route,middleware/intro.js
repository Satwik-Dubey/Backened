// Express.js Framework-> it is a npm package 

// Express.js is a popular web framework for building web applications in Node.js. It provides a set of features for handling HTTP requests and responses, routing, middleware, and more.

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