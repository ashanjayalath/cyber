const jwt = require('jsonwebtoken');

const validateToken = async (req,res,next)=>{
    const token = req.cookies.accessToken;
    if(!token){
        res.status(401).send({Error:"User is not authorized or token is missing"});
    }else{
        const authHeader = req.headers.Authorization || req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            const token = authHeader.split(" ")[1];
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
                if(err){
                    res.status(401).send({Error:"User is not authorized"});
                }
                res.user = decoded.user;
                next();
            });
        }
    }

    // const authHeader = req.headers.Authorization || req.headers.authorization;
    // if(authHeader && authHeader.startsWith("Bearer")){
    //     const token = authHeader.split(" ")[1];
    //     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    //         if(err){
    //             res.status(401).send({Error:"User is not authorized"});
    //         }
    //         res.user = decoded.user;
    //         next();
    //     });

    // }else{
    //     res.status(401).send({Error:"User is not authorized or token is missing"});
    // }
   
}

module.exports = validateToken;