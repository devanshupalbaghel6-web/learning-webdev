const express = require('express');
const app = express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.sendFile("/home/devanshu/Downloads/nodeLearning/index.html")
})
app.post("/add",(req,res)=>{
   const a = parseInt(req.body.firstNumber)
   const b = parseInt(req.body.secondNumber)
    const sum = a +b
    res.json({
        result: sum
    })
})
app.post("/sub",(req,res)=>{
    const a = parseInt(req.body.firstNumber)
    const b = parseInt(req.body.secondNumber)
    const difference = a - b
    res.json({
        result: difference
    })
})
app.post("/mul",(req,res)=>{
    const a = parseInt(req.body.firstNumber)
    const b = parseInt(req.body.secondNumber)
    const product = a * b
    res.json({
        result: product
    })
})
app.post("/div",(req,res)=>{
    const a = parseInt(req.body.firstNumber)
    const b = parseInt(req.body.secondNumber)
    const quotient = a / b
    res.json({
        result: quotient
    })
})
app.listen(3000)
