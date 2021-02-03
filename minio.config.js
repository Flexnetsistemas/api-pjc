const minio = require("minio")


var minioClient = new minioClient({
    endPoint: "play.minio.io",
    port: 9000,
    useSSL: true,
    accessKey:  'Q3AM3UQ867SPQQA43P2F',
    privateKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
})

module.exports = minioClient