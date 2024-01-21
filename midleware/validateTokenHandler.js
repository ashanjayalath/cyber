const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');


const validateToken = async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).send({Error:"User is not authorized"});
            }
            res.user = decoded.user;
            next();
        });

    }else{
        res.status(401).send({Error:"User is not authorized or token is missing"});
    }
   
}

module.exports = validateToken;