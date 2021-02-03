const express = require("express")
const router  = express.Router()
const mysql   = require("../mysql.config").pool

router.post("/",(req,res,next) => {
    mysql.getConnection((error,conn) => {
        if (error){
          return  res.status(500).send({erro : error})
        }
    conn.query("INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(?,?,?)",
    [req.body.id_artista, req.body.nomeAlbum, req.body.capa],  
    (error,result,field) =>{
        if (error){
           return res.status(500).send({erro : error})
        }
        res.status(201).send({message:"Sucesso na inclusão",
        id_artista: req.body.id_artista,
        id_album : result.insertId,
        nomeAlbum: req.body.nomeAlbum
      })
  })
 })
})

router.put("/",(req,res,next) => {
  mysql.getConnection((error,conn) => {
    if (error){
     return res.status(500).send({erro: error})
    }
    conn.query("UPDATE album SET nomeAlbum = ?, fk_artista = ? WHERE id_album = ? ",
    [req.body.nomeAlbum, req.body.fk_artista, req.body.id_album],
    (error, result, field) => {
      if (error){
      return res.status(500).send({erro: error})
      }    
     res.status(200).send({message: "Alterado com sucesso."})
    }
    )
  })
})


module.exports = router;