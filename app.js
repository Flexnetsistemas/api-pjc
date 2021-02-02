const express = require("express")
const app = express()
const routerArtista = require ("./routers/artista")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use("/api/v1/artista", routerArtista)

app.use('/',(req,res) => {
    res.send('Response in Server !')
})

module.exports = app;