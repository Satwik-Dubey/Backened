const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); // Corrected the typo here
const path = require('path');

app.set('view engine', 'ejs'); // Corrected the typo here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/create', (req, res) => {
    let { username, email, age, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send(err);
        bcrypt.hash(password, salt, async (err, hash) => { // for encrypting the password
            if (err) return res.status(500).send(err);
            try {
                let createdUser = await userModel.create({
                    username,
                    email,
                    age,
                    password: hash
                });
                //for login
                let token=jwt.sign({email},"secret key");
                res.cookie("token",token);
                res.send(createdUser);
            } catch (err) {
                res.status(500).send(err);
            }
        });
    });
});

app.post('/logout',(req,res)=>{
    res.cookie("token",null);
    res.redirect('/');
})

app.get('/login',(req,res)=>{
    res.render('login.ejs');
})

app.post('/login',async(req,res)=>{
    let user=await userModel.findOne({email:req.body.email}).catch(err=>res.send("error"));
    if(!user) return res.send("error");
    bcrypt.compare(req.body.password,user.password),(err,result)=>{
        if(err) return res.send("something is wrong");
        if(result){
            let token=jwt.sign({email:user.email},"secret key");
            res.cookie("token",token);
            res.send("yes u can login");
        }else{
            res.send("something is wrong");
        }
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

