const jwt = require('jsonwebtoken');

module.exports = {
    //Refresh user
    //GET method
    //Public
    refreshToken : async (req,res,next)=>{
        const token = req.cookies.refreshToken;
        if(!token){
            res.status(401).send({Error:"User is not authorized or token is missing"});
        }else{
            jwt.verify(token,process.env.REFRESH_ACCESS_TOKEN_SECRET,(err,decoded)=>{
                if(err){
                    res.status(401).send({Error:"User is not authorized"});
                }else{
                    const accessToken = jwt.sign({
                        user:{
                            name:decoded.name,
                            email:decoded.email,
                            id:decoded.id
                        }
                    },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn : "15m" }
                    );
                    res.status(200).send({Valid:true,Message:"New Access Token Genarate Sucessfull",token:accessToken})
                }
                next();
            });
        }   
    }
};
