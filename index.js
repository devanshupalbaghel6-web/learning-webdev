const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json())
let user_id = 1
let organisation_id = 1

const users = [];
const organisations = [];
const boards = [];
const issues = [];

//create end points
app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const userExists = users.find((user)=>user.username === username)
    if(userExists){
        res.status(403).json({
            message: "user already exists!"
        })
        return
    }
    users.push({
        username: username,
        password: password,
        id: user_id++
    })
    res.json({
        message: "you have signed up successfully!!!"
    })
});
app.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const userExists = users.find((user)=>user.username === username && user.password === password)
    if(!userExists){
        res.status(403).json({
            message: "Incorrect id or password!!"
        })
        return
    }
    // create jwt for the user
    const token = jwt.sign({
        userId:userExists.id
    },"devanshu123")
    res.json({
        token:token,
        message: "you have signed in successfully!!!"
    })
});
app.post('/organisations', (req, res) => {});
app.post('/add-member-to-organisation', (req, res) => {});
app.post('/boards', (req, res) => {});
app.post('/issues', (req, res) => {});
// get end points
app.get('/organisations', (req, res) => {});
app.get('/boards', (req, res) => {});
app.get('/issues', (req, res) => {});
app.get('/users', (req, res) => {});
//update
app.put('/issues', (req, res) => {});
//delete
app.delete('/users', (req, res) => {});

app.listen(3000);
