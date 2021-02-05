const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token,'ricardo2021')
        next();
    } catch (erro) {
       return  res.status(401).send({messsge: 'Falha de Autenticação'})
        
    }
}