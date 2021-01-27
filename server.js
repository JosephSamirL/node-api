const express = require('express');
const app = express()
const port = process.env.PORT || 8000;

app.get('/', (req,res)=>{
    res.send("<h1>hello hello</h1>")
})

app.listen(port, ()=>{
    console.log("working")
})