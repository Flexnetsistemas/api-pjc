const express = require("express")
const app = express()


app.use('/',(req,res) => {
    res.send('Response in Server !')
})

module.exports = app;