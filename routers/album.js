const express  = require("express")
const router   = express.Router()
const mysql    = require("../mysql.config").pool
const multer   = require("multer")
const minioClient = require("../minio.config")
const crypto   = require("crypto")
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

router.post("/", upload.single('capa'), (req,res) => {

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

module.exports = router;