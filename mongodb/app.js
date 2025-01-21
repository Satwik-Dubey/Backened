const express= require('express');
const app= express();


const userModel=require('./usermodel');

app.get("/",(req,res)=>{
    res.send("hey")
});

app.get('/create',async (req,res)=>{
    let createduser= await userModel.create({ // In JavaScript, async and await are used to handle asynchronous code in a more synchronous way. When a function is marked as async, it means that it returns a Promise. The await keyword is used inside an async function to pause the execution of the function until the Promise is resolved or rejected.
        name:"harsh",
        username:"harsh",
        email:"sfsd@gmail.com"
    }); // this is asynchronus function

    res.send(createduser);
})

app.get('/create',async (req,res)=>{
    let createduser= await userModel.create({ // In JavaScript, async and await are used to handle asynchronous code in a more synchronous way. When a function is marked as async, it means that it returns a Promise. The await keyword is used inside an async function to pause the execution of the function until the Promise is resolved or rejected.
        name:"satwik",
        username:"ha",
        email:"ssd@gmail.com"
    }); // this is asynchronus function

    res.send(createduser);
})

app.get('/update',async (req,res)=>{
    let updateduser=await userModel.findOneAndUpdate({username:"harsh"},{name:"harsh vsn"},{new:true});


    res.send(updateduser);
})

app.get('/read',async (req,res)=>{
    // let users= await userModel.find() // ye saare user find karega
    let users=await userModel.findOne({username:"harsh"}); // ye kisi ek user ko find karne ke liya ho rha h
    res.send(users);
})

app.get('/delete',async(req,res)=>{
    let users=await userModel.findOneAndUpdate({username:"harsh"});
    res.send(users);
})

app.listen(1234);
