const express       = require("express");
const app           = express();
const routerUsuario = require("./routers/usuario");
const routerArtista = require("./routers/artista")
const routerAlbum   = require("./routers/album");
const bodyParser    = require("body-parser");
const cors          = require("cors");

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use("/api/v1/usuario", routerUsuario);
app.use("/api/v1/artista", routerArtista);
app.use("/api/v1/album",   routerAlbum);

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    app.use(cors());
    next();
})


app.use('/',(req,res) => {
    res.send({erro: 'Rota não localizada'});
})

module.exports = app;