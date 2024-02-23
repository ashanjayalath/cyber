const errorMessages = require('../../midleware/errorHandler');
const priceListModel = require('../../models/item_model/priceListModel');


module.exports = {
    //Item Insert
    //POST method
    //Public
    ItemInsert : async (req,res,next)=>{
        //get the data from request body
        const {ItemType,ItemName,ItemUnit,ItemSalesInfo,ItemPurchaseInfo} = req.body;

        try{
            const Items = await priceListModel.create({
                ItemType,
                ItemName,
                ItemUnit,
                ItemSalesInfo,
                ItemPurchaseInfo
            })
            res.status(200).json({
                _id:Items.id,
                ItemType:Items.ItemType,
                ItemName:Items.ItemName,
                ItemUnit:Items.ItemUnit,
                ItemSalesInfo:Items.ItemSalesInfo,
                ItemPurchaseInfo:Items.ItemPurchaseInfo
            });
        }catch(error){
            res.status(409).json({Error : error,message:`Duplicate ${error.keyValue}`});
            //next(errorMessages(409,error))
        }
    },

    //Item Delete One
    //DELETE method
    //Public
    ItemDeleteByOne : async(req,res)=>{
        try{
            const ItemDelete = await priceListModel.findOneAndDelete({_id: req.params.id});
            res.status(200).json({message : "Item Delete Successfully..",ItemDelete});
         }catch(error){
             res.status(500).json({message:error.message})
         }
    },
    
    //Item Delete bulk with they name
    //DELETE method
    //Public
    ItemDeleteBulk : async(req,res,next)=>{
        const {ItemName} = req.body;

        try{
            const ItemDeleteBulk = await priceListModel.deleteMany({ItemName:ItemName});
            res.status(200).json({message : "Item Bulk Delete Successfully..",ItemDeleteBulk});
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },

    //Item Update
    //PUT
    //public
    ItemUpdate : async (req,res)=>{
        //get the data from request body
        const {ItemType,ItemName,ItemUnit,ItemSalesInfo,ItemPurchaseInfo} = req.body;
        try{
            const ItemUpdate = await priceListModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set:{
                        ItemType : req.body.ItemType,
                        ItemName : req.body.ItemName,
                        ItemUnit : req.body.ItemUnit,
                        ItemSalesInfo : req.body.ItemSalesInfo,
                        ItemPurchaseInfo : req.body.ItemPurchaseInfo
                    }
                },
                {new: true}
                );
                res.status(200).json(ItemUpdate);
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },

    //Item Insert
    //PUT
    //public
    ItemGet : async (req,res)=>{
        try{
            const Items = await priceListModel.findById({_id: req.params.id})
            res.status(200).json(Items);
        }catch(error){
            res.status(409).json({Error : error,message:`Duplicate ${error.keyValue}`});
        }
    },

    //Item Get All
    //GET method
    //Private
    ItemGetAll : async(req,res)=>{
        try{
            const Items = await priceListModel.find({})
            res.status(200).json(Items);
        }catch(error){
            res.status(409).json({Error : error,message:`Duplicate ${error.keyValue}`});
        }
    }

};
