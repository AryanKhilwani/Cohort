const express = require('express');
const bodyParser =  require('body-parser');
const zod = require('zod');
const port=3000;
const app=express();

// app.use(bodyParser.json());

const schema=zod.array(zod.number());

app.use(express.json());

// Without Middlewares

// app.get('/healthcheck', (req,res)=>{

//     const kidneyid = req.query.kidneyid
//     const username = req.headers.username
//     const password = req.headers.password

//     if(username!='Aryan' || password!='pass'){
//         res.sendStatus(403).json({
//             msg:'User not found'
//         })
//         return
//     }
// });

// With middlewares

function usercheck(req,res,next){
    const username = req.headers.username
    const password = req.headers.password
    if(username!='Aryan' || password!='pass'){
        res.status(403).json({
            msg : "User not found"
        })
    }
    else next()
}

function inputcheck(req,res,next){
    const kidneyid = req.body.kidneyid
    const check=schema.safeParse(kidneyid);
    if(!check.success){
        res.status(403).json({
            msg : "Input invalid"
        })
    }
    else next()
}

app.post('/healthcheck', usercheck,inputcheck, (req,res)=>{

    res.status(200).json({
        msg : "You are Healthy"
    })
    
});

app.listen(port);