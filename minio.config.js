const minio = require("minio")


var minioClient = new minio.Client({
    endPoint: 'play.min.io',
    port: 9000,
    useSSL: true,
    accessKey:  'Q3AM3UQ867SPQQA43P2F',
    privateKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'

   //  AccessKey: Q3AM3UQ867SPQQA43P2F
   //SecretKey: zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG
})

module.exports = minioClient