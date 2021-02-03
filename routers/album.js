const express  = require("express")
const router   = express.Router()
const mysql    = require("../mysql.config").pool
const multer   = require("multer")
const minioClient = require("../minio.config")
var nameFile = ""

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null,'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, nameFile=Date.now()+'-'+file.originalname)  
  } 
})
const upload = multer({storage})

router.post("/", upload.single('capa'), (req,res,next) => {
    uploadMinio('uploads/'+nameFile)
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

function uploadMinio(file){
    var metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        'example': 5678
    }
   minioClient.fPutObject('zx-bucket', nameFile, file, metaData, function(err, etag) {
      if (err) return err
      console.log('Upload do Arquivo realizado com sucesso.')      
    })
}

module.exports = router;