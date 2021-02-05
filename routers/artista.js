const express = require("express")
const router  = express.Router()
const mysql   = require("../mysql.config").pool
const minioClient      = require("../minio")
const { presignedUrl } = require('../minio');
const jwtLogin         = require('../jwt-login');



router.get('/', jwtLogin, (req, res, next) => {
  mysql.getConnection((error, conn) => {
  if (error) {
    return res.status(500).send({ erro: error })
    }
     let order   = ''
     let artista  = (!req.query.artista) ? "%" : req.query.artista+"%"
/*        if (req.query.limit || req.query.skip){
        let artista  = (!req.query.skip) ? 0 : req.query.skip
        limit = (!req.query.limit) ? 10 : req.query.limit
        limit = `limit ${skip}${','}${limit}` 
         }
         */

     if (req.query.order){
        order = `order by A.nome ${req.query.order}`             
     }else{
        order = 'order by A.nome ASC'
     }
     conn.query(`SELECT A.id_artista, A.id_artista, A.nome,AL.nomeAlbum, AL.capa  FROM artista A`+
                 ` INNER JOIN album AL ON A.id_artista = AL.fk_artista`+
                 ` WHERE A.nome LIKE '`+artista+`' ${order}`, 
      (error, result, field) => {
      conn.release()
      if (error) {
        return res.status(500).send({ erro: error });
      }    
         //       result.fectAll
        //        rowsTotal   = resultado.map(q=>q.qtde)[0]-1;
      //          qdePages   =  1 //Math.trunc(rowsTotal / resultado.length);
       let img =  result.map(image => image.capa)  
       let imgLink = ''; 
   
       return new Promise((resolve, reject) => {
         getimageURL(img, (err, link) => {
         if (err) {  
            reject(respondClient(""))
          }else{
            resolve(respondClient(link))
          }
          })
        })  
              
       function respondClient(link){
        const artistas = result.map(art => {
         return {
             id_artista: art.id_artista,  
             nome      : art.nome,
             album     : art.nomeAlbum,
             capa_link : link
             }
            })
/*        const  albuns =  result.map(art => {
         return {
            album     : art.nomeAlbum,
            capa_link : imgLink
            }
           }) */
           res.status(200).send({ Artista: artistas })
          }
        })
   
     })
 })

router.post("/cadastro",jwtLogin,(req,res,next) => {
  mysql.getConnection((error,conn) => {
    if (error) {
      return res.status(500).send({ erro: error })
     }
    if (req.body.nome === ""){
      return res.status(404).send({erro: 'Informar o nome do Artista'})
     }  
    conn.query("INSERT INTO artista(nome) VALUES(?)",
    [req.body.nome],
    (error,result,field)=>{
      if(error){
        return res.status(500).send({erro: error})
      }
      res.status(201).send({message:"Sucesso na inclusão",
      id_artista: result.insertId,
      nome:       req.body.nome,
     })
   })
  })
})

router.put("/",jwtLogin,(req,res,next) => {
  mysql.getConnection((error,conn) => {
    if (error){
     return res.status(500).send({erro: error})
    }
    conn.query("UPDATE artista SET nome = ? WHERE id_artista = ? ",
    [req.body.nome, req.body.id_artista],
    (error, result, field) => {
      if (error){
      return res.status(500).send({erro: error})
      }    
     res.status(200).send({message: "Alterado com sucesso."})
    }
    )
  })
})


async function getimageURL(image,callback)
{

  try {
    await minioClient.presignedUrl('GET','zx-bucket', image, 300)
    callback()
  } catch (error) {
    console.log(error)
    callback(error)
    
  }   

}


module.exports = router;
