const express = require('express')
const {use}   = require("../app")
const mysql   = require("../mysql.config").pool
const router  = express.Router()

router.post('/', (req, res, next) => {
 if (req.body.email === "" || req.body.senha === ""){
        return res.status(404).send({erro: 'Informar email e Senha'})
     }
     mysql.getConnection((error, conn) => {
        conn.query("INSERT INTO usuario(email,senha) VALUES(?,?)",
        [req.body.email, req.body.senha],
        (error,result,field) => {
            conn.release()
            if (error) {
            return res.status(401).send({ erro: error, message: "Não fois possível cadastrar o usuário" });
            } 
            res.status(201).send({message:"Usuário cadastrado com sucesso !",
            id_usuario: result.insertId, email: req.body.email})   
        })
    })
})

module.exports = router;