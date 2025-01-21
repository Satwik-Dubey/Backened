const express=require("express");
const app= express();
const path=require("path")
const userModel=require('./models/user.js');
const user = require("./models/user.js");


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/read',async(req,res)=>{
    let users=await userModel.find();
    res.render("read",{users});
})


app.get('/edit:id',async(req,res)=>{
    let user=await userModel.findOne({_id:req.params.id});
    res.render("edit",{user})
})

app.post('/update/:id',async(req,res)=>{
    let{name,email,image}=req.body;
    let user=await userModel.findByIdAndUpdate({_id:req.params.id},{name,email,image},{new:true});
    res.redirect("/read")
})

app.get('/delete/:id',async(req,res)=>{
    let users=await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/read');
})

app.patch('/create',async(req,res)=>{
    let{name,email,image}=req.body;
    let createsUser=await userModel.create({
        name,
        email,
        image
    })
    res.redirect('/read');
    // res.send(createsUser); 
})

app.listen(3000);
 