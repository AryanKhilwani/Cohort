const express = require('express');
const mongoose = require('mongoose');
const { string } = require('zod');

mongoose.connect("mongodb+srv://aryankhilwani:Aryan%402580@learningmongodb.rgkekbm.mongodb.net/new")
const app = express();
const port = 3000;

app.use(express.json());

const user = mongoose.model('Users', {name : String, email : String, password : String});
// const User = mongoose.model("User", {
//     name: String,
//     username: String,
//     pasword: String,
//   });
app.post('/SignUp',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const name=req.body.name;

    const existingUser=await user.findOne({Email : username});
    if(existingUser){
        res.status(400).send("Username already exists");
    }

    const User = new user({
        name : name,
        email : username,
        password : password
    });

    User.save();

    res.send("User save successfully");

});


app.listen(port);