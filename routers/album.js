const express  = require("express")
const router   = express.Router()
const mysql    = require("../mysql.config").pool
const multer   = require("multer")
const minioClient = require("../minio")
const { presignedUrl } = require('../minio');
const crypto   = require("crypto")
const jwtLogin      = require("../jwt-login")
var obj = ""


var nameFile = ""

var idFile = crypto.randomBytes(6).toString("hex")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null,'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, nameFile = idFile+file.originalname)  
  } 
})
const upload = multer({storage})



router.get('/', jwtLogin, (req, res, next) => {
 
  mysql.getConnection((error, conn) => {
  if (error) {
    return res.status(500).send({ erro: error })
    }
      let album = (!req.query.album) ? "%" : req.query.album
/*        if (req.query.limit || req.query.skip){
        let artista  = (!req.query.skip) ? 0 : req.query.skip
        limit = (!req.query.limit) ? 10 : req.query.limit
        limit = `limit ${skip}${','}${limit}` 
         }
         */
     conn.query(`SELECT A.id_artista, A.nome, AL.nomeAlbum, AL.capa FROM album AL`+
                 ` INNER JOIN artista A ON A.id_artista = AL.fk_artista`+
                 ` WHERE AL.nomeAlbum LIKE '%`+album+`%'`, 
      (error, result, field) => {
      conn.release()
      if (error) {
        return res.status(500).send({ erro: error });
      }    
        if(result < 1){
          res.status(404).send({message: "Nenhum registro encontrado"})
        }
       let img =  result.map(image => image.capa) 
       
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
      const artistas = result.reduce(art => {
         return {
             id_artista: art.id_artista,  
             nome      : art.nome,
             }
            })
         const  albuns =  result.map(art => {
         return {
            album     : art.nomeAlbum,
            capa_url  : link
            }
           }) 
           res.status(200).send({ Album: albuns , Artista: artistas})
     
        }
      })
    })  
   
 })


router.post("/", upload.single('capa'), jwtLogin, (req,res) => {
 
  return new Promise((resolve, reject) => {
  uploadMinio('uploads/'+nameFile, (err) => {
   if (err) {  
      reject(res.status(500).send({erro : err}));
    }else{
      resolve(
        mysql.getConnection((error,conn) => {
       if (error){
         return  res.status(500).send({erro : error})
        }
       conn.query("INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(?,?,?)",
       [req.body.fk_artista, req.body.nomeAlbum, nameFile],  
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
   )}
  })
 })
})

router.put("/", jwtLogin, (req,res,next) => {
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

async function uploadMinio(file,callback){
  var metaData = {
    'Content-Type': 'application/octet-stream',
    'X-Amz-Meta-Testing': 1234,
    'example': 5678
   }
  try {
   var value =  await minioClient.fPutObject('zx-bucket', nameFile, file, metaData)
   callback()    
  } catch (error) {
   callback(error)
  }
}


async function getimageURL(image, callback)
{
  try{
   var url = ""

   url = await minioClient.presignedUrl('GET','zx-bucket', image, 300)
   console.log(url)
   callback(url)
   
 } catch (error) {
   callback(error)
    
}   

}

module.exports = router;