const express = require('express')
const app = express()
app.use(express.json())
const notes = []
app.get('/',(req,res)=>{
    res.sendFile("/home/devanshu/Downloads/nodeLearning/auth.html")
})
app.post('/notes',(req,res)=>{
    const note = req.body.note
    notes.push(note)
    res.json({
        message:"Done",
        response: req.body.note
    })
})
app.get('/notes',(req,res)=>{
    res.json({
        notes
    })
})

app.listen(3000)