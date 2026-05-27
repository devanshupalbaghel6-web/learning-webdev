const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
const notes = []
const users = []

app.get('/',(req,res)=>{
    res.sendFile("/home/devanshu/Downloads/nodeLearning/auth.html")
})
app.get('/signup.html',(req,res)=>{
    res.sendFile("/home/devanshu/Downloads/nodeLearning/signup.html")
})
app.get('/signin.html',(req,res)=>{
    res.sendFile("/home/devanshu/Downloads/nodeLearning/signin.html")
})
app.post('/signup',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const userExists = users.find((user => user.username === username))
    if (userExists){
        return res.status(403).json({
            message: "user already exists!"
        })
    }
    users.push({
        username: username,
        password: password
    })
    const token = jwt.sign({
        username:username
    },"devanshu123")
    res.json({
        token: token,
        message: "you have signed up!"
    })
})
app.post('/signin',(req,res)=>{
    username = req.body.username,
    password = req.body.username
    const userExists = users.find((user=>user.username === username && user.password === user.password))
    if(!userExists){
        return res.status(403).json({
            message: "Incorrect id or password!!"
        })
    }
    const token = jwt.sign({
        username:username
    },"devanshu123")
    res.json({
        token: token
    })
})

app.get('/users',(req,res)=>{
    const token = req.headers.token
    if(!token){
        res.status(403).send({
            message: "you are not signed in!"
        })
    }
    const decoded = jwt.verify(token,"devanshu123")
    const username = decoded.username
    if(!username){
        res.status(403).json({
            message: "malformed token."
        })
        return;
    }
    res.json({
        total: users.username 
    })
})
app.post('/notes',(req,res)=>{

    const token = req.headers.token
    if(!token){
        res.status(403).send({
            message: "you are not signed in!"
        })
    }
    const decoded = jwt.verify(token,"devanshu123")
    const username = decoded.username
    if(!username){
        res.status(403).json({
            message: "malformed token."
        })
        return;
    }

    const note = req.body.note
    notes.push({note,username})
    res.json({
        message:"Done",
        response: req.body.note
    })
})
app.get('/notes',(req,res)=>{

     const token = req.headers.token
    if(!token){
        res.status(403).send({
            message: "you are not signed in!"
        })
    }
    const decoded = jwt.verify(token,"devanshu123")
    const username = decoded.username
    if(!username){
        res.status(403).json({
            message: "malformed token."
        })
        return;
    }
    const userNote = notes.filter((note)=>note.username===username)

    res.json({
        notes: userNote
    })
})

app.listen(3000)