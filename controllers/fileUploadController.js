const userModel = require('../models/userModel');
const {cloudinary,opt} = require('../util/cloudinary');
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)



module.exports = {
    //Uer Photo update with Auth
    uploadPhoto : async (req,res,next)=>{
        try{
            const result = await cloudinary.uploader.upload(req.file.path,opt);
            const {id} = req.body;
            const UserUpdate = await userModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set:{
                        image : result
                    }
                },
                {new: true}
                );
                const {password,...bulk} = UserUpdate._doc;
                await unlinkAsync(req.file.path)
                res.status(200).json(bulk);
        }catch(error){
            res.status(500).send({message:error.message})
        }
    },
    userPhotoDelete : async (req,res,next)=>{
        try{
            const User = await userModel.findOne({_id: req.body.id});
            const result = await cloudinary.uploader.destroy(User.image.public_id);
            const UserUpdate = await userModel.findByIdAndUpdate(
                req.body.id,
                {
                    $set:{
                        image : process.env.DEFAULT_AVATAR
                    }
                },
                {new: true}
                );
            res.status(200).json({Status:"sucsess",message:"User photo delete Successfully..",result});
        }catch(error){
            res.status(500).send({message:error.message})
        }
    }
    
}
