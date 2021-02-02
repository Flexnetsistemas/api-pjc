const express       = require("express")
const app           = express()
const routerUsuario = require("./routers/usuario")
const routerArtista = require("./routers/artista")
const routerAlbum   = require("./routers/album")
const bodyParser    = require("body-parser")

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use("/api/v1/usuario", routerUsuario)
app.use("/api/v1/artista", routerArtista)
app.use("/api/v1/album",   routerAlbum)


app.use('/',(req,res) => {
    res.send('Response in Server !')
})

module.exports = app;