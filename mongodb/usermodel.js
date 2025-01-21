const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:1234/mongopractice`);
// schema means har user ke paas jo details hongi vo userschema hoga
const userSchema=mongoose.Schema({
    name:String,
    username:String,
    email:String
})

module.exports = mongoose.model("User",userSchema);

    