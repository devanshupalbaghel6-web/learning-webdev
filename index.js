const express = require('express');
const users =[{
    id: 1,
    username: "devanshu",
    password: "123123"
}]
const organisations = [{
    id:1,
    title: "devanshu's org",
    description: "This is devanshu's org",
    admin: "devanshu",
    members: [1]
}]
const boards = [{
    id: 1,
    title: "devanshu's board",
    description: "This is devanshu's board",
    organisation: "devanshu's org",
    members: [1]
}]
const issues = [{
    id: 1,
    title: "devanshu's issue",
    description: "This is devanshu's issue",
    board: "devanshu's board",
    assignee: 1
}]
const app = express()
//create end points
app.post('/signin', (req, res) => {})
app.post('/signup', (req, res) => {})
app.post('/organisations', (req, res) => {})
app.post('/add-member-to-organisation', (req, res) => {})
app.post('/boards', (req, res) => {})
app.post('/issues', (req, res) => {})
// get end points
app.get('/organisations', (req, res) => {})
app.get('/boards', (req, res) => {})
app.get('/issues', (req, res) => {})
app.get('/users', (req, res) => {})
//update
app.put('/issues', (req, res) => {})
//delete
app.delete('/users', (req, res) => {})



app.listen(3000)