const express = require('express');
const mysql   = require("../mysql.config").pool;
const router  = express.Router();
const bcrypt  = require("bcrypt");
 const jwt    = require("jsonwebtoken");

router.post('/login', (req, res, next) => {
  if (req.body.email === "" || req.body.senha === ""){
      return res.status(404).send({erro: 'Informar email e Senha'});
    }
     mysql.getConnection((error, conn) => {
       conn.query("SELECT email, senha from usuario WHERE (email = ?)",
        [req.body.email],
        (error,results,fields) => {
         conn.release();
         if(results.length < 1){
          return res.status(401).send({message:"Falha de Autenticação"});
         }
         bcrypt.compare(req.body.senha, results[0].senha, (error,result) => {
            if(result){
             const token = jwt.sign({id_usuario:results[0].id_usuario, 
                email:results[0].email}, "ricardo2021",
                {
                    expiresIn: 16000
                })
                res.status(200).send({message:"Usuário Autenticado",
                 email:req.body.email, token: token})
            }else{
                res.status(401).send({message:"Falha na Autenticação"});
            }           
         })
       })
     })
  })

router.post('/', (req, res, next) => {
 if (req.body.email === "" || req.body.senha === ""){
        return res.status(404).send({erro: 'Informar email e Senha'});
     }
     mysql.getConnection((error, conn) => {
        bcrypt.hash(req.body.senha, 10,(errBcrypt, hash)=>{
        conn.query("INSERT INTO usuario(email,senha) VALUES(?,?)",
        [req.body.email, hash],
        (error,result,field) => {
            conn.release();
            if (error) {
            return res.status(401).send({ erro: error, message: "Não fois possível cadastrar o usuário" });
            } 
            res.status(201).send({message:"Usuário cadastrado com sucesso !",
            id_usuario: result.insertId, email: req.body.email});  
        })
      })
   })
})

module.exports = router;