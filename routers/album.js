const express     = require("express");
const router      = express.Router();
const mysql       = require("../mysql.config").pool;
const multer      = require("multer");
const minioClient = require("../minio");
//const { presignedUrl } = require('../minio');
const crypto           = require("crypto");
const jwtLogin         = require("../jwt-login");
var nameFile = "";
var imageLink = [];

var idFile = crypto.randomBytes(6).toString("hex")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null,'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, nameFile = idFile+file.originalname); 
  } 
})
const upload = multer({storage});

router.get('/', jwtLogin, (req, res, next) => { 
  mysql.getConnection((error, conn) => {
  if (error) {
    return res.status(500).send({ erro: error });
    }
      let album = (!req.query.album) ? "%" : req.query.album
      let limit = ''
      if (req.query.limit || req.query.skip){
       let skip  = (!req.query.skip) ? 0 : req.query.skip
           limit = (!req.query.limit) ? 2 : req.query.limit
           limit = `limit ${skip}${','}${limit}`
      }
       let order  = (!req.query.order) ? "asc": req.query.order
 
     conn.query(`SELECT A.id_artista, A.nome, AL.nomeAlbum, AL.capa FROM album AL `+
                 ` INNER JOIN artista A ON A.id_artista = AL.fk_artista`+
                 ` WHERE AL.nomeAlbum LIKE '%`+album+`%'` +
                 ` ORDER BY AL.nomeAlbum  ${order}  `+
                 ` ${limit}   `, 
      (error, result, field) => {
      conn.release()
      if (error) {
        return res.status(500).send({ erro: error });
      }    
        if(result < 1){
          res.status(404).send({message: "Nenhum registro encontrado"})
        }

       let img =  result.map(image => image.capa);
     
        new Promise((resolve, reject) => {
        getimageURL(img, (err, url) => {
        
        if (err) {  
           reject(respondClient(""));
         }else{
           resolve(respondClient());     
         }
         })
      })
     function respondClient(){
      const artistas = result.map(art => {
        return {
            id_artista: art.id_artista,  
            nome      : art.nome,
            album     : art.nomeAlbum,
            capa_link :  "" // imageLink[0]
            }
           });

      let groupData = {};  
      
      for (var i = 0; i < artistas.length; i++) {
        var item = artistas[i];
        if (!groupData[item.nome])
          groupData[item.nome] = [];
        groupData[item.nome].push(item);
      }
      res.status(200).send(groupData);
     }
      })
    })     
 })


router.post("/", upload.single('capa'), jwtLogin, (req,res) => { 
  return new Promise((resolve, reject) => {
  uploadMinio('uploads/'+nameFile, (err) => {
   if (err) {  
      reject(res.status(500).send({ message: "Upload da imagem rejeitado, bucket pode estar em Read-Only", erro : err}));
    }else{
      resolve(
        mysql.getConnection((error,conn) => {
       if (error){
         return  res.status(500).send({erro : error});
        }
       conn.query("INSERT INTO album(fk_artista,nomeAlbum,capa) VALUES(?,?,?)",
       [req.body.fk_artista, req.body.nomeAlbum, nameFile],  
       (error,result,field) =>{
         if (error){
           return res.status(500).send({erro : error});
          }
        res.status(201).send({message:"Sucesso na inclusão do álbum",
          id_artista: req.body.id_artista,
          id_album : result.insertId,
          nomeAlbum: req.body.nomeAlbum
        })})
     }))}
  })})
})

router.put("/", jwtLogin, (req,res,next) => {
  mysql.getConnection((error,conn) => {
    if (error){
     return res.status(500).send({erro: error});
    }
    conn.query("UPDATE album SET nomeAlbum = ?, fk_artista = ? WHERE id_album = ? ",
    [req.body.nomeAlbum, req.body.fk_artista, req.body.id_album],
    (error, result, field) => {
      if (error){
      return res.status(500).send({erro: error});
      }    
     res.status(200).send({message: "Alterado com sucesso."});
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
   var url =  await minioClient.fPutObject('zx-bucket', nameFile, file, metaData);
    callback();   
  } catch (error) {
   callback(error)
  }
}

async function getimageURL(image, callback)
{
  try{
   var url = await minioClient.presignedUrl('GET','zx-bucket', image[0], 300);
   imageLink.push(url);
   callback();
  }catch(error) {
    callback(error);
 }   
}

module.exports = router;