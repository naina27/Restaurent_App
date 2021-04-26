const mongoose=require('mongoose');
const {Schema}=require('mongoose');

const fieldSchema=new Schema({
    fieldname:{
        type:String,
        ref:"dishModel",   
        required:true     
    }
   
});
const fieldModel=mongoose.model('field',fieldSchema);
module.exports=fieldModel;