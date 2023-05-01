const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next)=>{
    try{

        const decoded = jwt.verify(req.headers.authorization.split(' ')[1],'12345678')
        req.user=decoded
        next()


    }catch(err){
        res.status(401).send('invalid Token')
    }


}

module.exports= {verifyToken}