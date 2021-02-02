const express = require("express")
const {use} = require("../app")
const router = express.Router()
const mysql = require("../mysql.config").pool


router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ erro: error })
      }
       let order   = ''
       let artista  = (!req.query.artista) ? "%" : req.query.artista
/*        if (req.query.limit || req.query.skip){
        let artista  = (!req.query.skip) ? 0 : req.query.skip
        limit = (!req.query.limit) ? 10 : req.query.limit
        limit = `limit ${skip}${','}${limit}` 
         }
         */
        console.log(artista)   
   
         if (req.query.order){
            order = `order by A.nome ${req.query.order}`             
         }else{
            order = 'order by A.nome ASC'
         }
        conn.query(`select A.id_artista, A.nome, AL.nomeAlbum, AL.capa  from artista A`+
                 ` inner join album AL on A.id_artista = AL.fk_artista`+
                 ` where A.nome like '`+artista+`' ${order}`, 
                (error, result, field) => {
                conn.release()
                if (error) {
                return res.status(500).send({ erro: error });
                }    
         //       result.fectAll
        //        rowsTotal   = resultado.map(q=>q.qtde)[0]-1;
      //          qdePages   =  1 //Math.trunc(rowsTotal / resultado.length);
            let img =  result.map(image => image.capa)   

            const artistas = result.map(art => {
                return {
                id_artista : art.id_artista,  
                nome      :  art.nome
                }
                })
            const albuns = result.map(art => {
                return {
                album     :  art.nomeAlbum,
                Capa      :  art.capa
                }
                })       

            //    const response = getURL(img, produto)
                 
               res.status(200).send({Artista : artistas, Albuns: albuns  })
        })  
    })
})

module.exports = router;
