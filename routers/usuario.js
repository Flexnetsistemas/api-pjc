const express = require('express')
const mysql   = require("../mysql.config").pool
const router  = express.Router()

router.post('/login', (req, res, next) => {
  if (req.body.email === "" || req.body.senha === ""){
      return res.status(404).send({erro: 'Informar email e Senha'})
    }
     mysql.getConnection((error, conn) => {
       conn.query("SELECT email, senha from usuario WHERE (email = ?) and (senha = ?)",
        [req.body.email, req.body.senha],
        (error,result,fields) => {
         conn.release()
         if(result.length < 1){
          return res.status(401).send({message:"Falha de Autenticação"})
         }
          res.status(200).send({message:"Autenticado com sucesso"})
       })
     })
  })

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