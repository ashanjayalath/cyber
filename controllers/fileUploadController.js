const userModel = require('../models/userModel');
const {cloudinary,opt} = require('../util/cloudinary')


module.exports = {
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
                res.status(200).json(bulk);
        }catch(error){
            res.status(500).send({message:error.message})
        }
    }
    
}
