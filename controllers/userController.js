const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorMessages = require('../midleware/errorHandler');
const {cloudinary,opt} = require('../util/cloudinary');


module.exports = {
    //Register user
    //POST method
    //Public
    userRegister : async (req,res,next)=>{
        //get the data from request body
        const {name,email,password,phone} = req.body;

        try{
            const result = await cloudinary.uploader.upload(req.file.path,opt);
            //Hashed the password
            const hashPassword = await bcrypt.hash(password,10);
            const User = await userModel.create({
                name,
                email,
                password:hashPassword,
                phone,
                image:result || process.env.DEFAULT_AVATAR
            })
            res.status(200).json({
                _id:User.id,
                name:User.name,
                email:User.email,
                phone:User.phone,
                image:User.image
            });
        }catch(error){
            res.status(409).json({Error : error,message:`Duplicate ${error.keyValue}`});
            //next(errorMessages(409,error))
        }
    },

    //Login user
    //POST method
    //Public
    userLogin : async(req,res)=>{
        const {email,password} = req.body;
        const User = await userModel.findOne({email});
        if(User && (await bcrypt.compare(password,User.password))){
            const accessToken = jwt.sign({
                user:{
                    name:User.name,
                    email:User.email,
                    id:User.id
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn : "15m" }
            );
            const refreshToken = jwt.sign({
                user:{
                    name:User.name,
                    email:User.email,
                    id:User.id
                }
            },
                process.env.REFRESH_ACCESS_TOKEN_SECRET,
                { expiresIn : "30d" }
            );
            const {password,...bulk} = User._doc;
            res.cookie('refreshToken',refreshToken,{maxAge:60000})
            res.status(200).json({Valid:true,Message:"User Sucessfully login",user:bulk,token:accessToken})
        }else{
            res.status(401).json({error : "Email or password not valid"});
        }
    },
    
    //LogOut user
    //GET method
    //Public
    userLogOut : async(req,res)=>{
        try {
            const cookies = req.cookies;
            res.clearCookie('jwt',{httpOnly:true,sameSite:'none',secure:true},"refreshToken")
            res.setHeader('Clear-Site-Data', '"cookies"');
            res.status(200).json({ message: 'You are logged out!' });
        } catch (error) {
            res.status(500).json({message:error.message})
        }

    },
    

    //Update user
    //PUT
    //public
    userUpdate : async (req,res)=>{
        //get the data from request body
        const {name,email,phone,city,age,image,id} = req.body;

        try{
            const UserUpdate = await userModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set:{
                        name : req.body.name,
                        email : req.body.email,
                        phone : req.body.phone,
                        city : req.body.city,
                        age : req.body.age,
                        image : req.body.image
                    }
                },
                {new: true}
                );
                const {password,...bulk} = UserUpdate._doc;
                res.status(200).json(bulk);
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },

    //Update user password
    //PUT
    //public
    userPasswordUpdate : async (req,res)=>{
        //get the data from request body
        const {CurrentPassword,NewPassword,id} = req.body;
        const User = await userModel.findOne({id});
        if(await bcrypt.compare(CurrentPassword,User.password)){
            const hashPassword = await bcrypt.hash(NewPassword,10);
            try{
                const UserPasswordUpdate = await userModel.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:{
                            password : hashPassword
                        }
                    },
                    {new: true}
                    );
                    res.status(200).json({Message : "Password Updated Successfully...",UserPasswordUpdate});
            }catch(error){
                res.status(500).json({message:error.message})
            }
        }else{
            res.status(201).json({message:"Youer password is incorrect"});
        }

        
    },

    
    //Delete user
    //DELETE method
    //Private
    userDelete : async(req,res)=>{
         try{
            const userDelete = await userModel.findOneAndDelete({_id: req.params.id});
            res.status(200).json({message : "User Delete Successfully..",userDelete});
         }catch(error){
             res.status(500).json({message:error.message})
             //res.redirect("/user/login");
         }
    }


};
