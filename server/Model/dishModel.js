const mongoose=require('mongoose');
const {Schema}=require('mongoose');

const dishSchema=new Schema({
    dishname:{
        type:String,
        required:true     
    },
    images:{
        type:String,
         required:true
    },
    fieldname:{
    	type:String,
    	required:true
    },
   
 },
{
	timestamps:true
}
);

const dishModel=mongoose.model('dishfield',dishSchema);
module.exports=dishModel;