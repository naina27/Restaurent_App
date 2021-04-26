const express = require("express");
const router = express();
const multer= require('multer');
 mongoose = require("mongoose");
const fieldModel=require('../Model/fieldModel');
const dishModel=require('../Model/dishModel');

router.get("/", (req, res) => {
  res.send("Get Response");
});



router.post("/create",async(req,res)=>{
 // console.log("hiii")
  const{fieldname}=req.body
  console.log(fieldname);
  try{
  	const data=await fieldModel.create(req.body,(err, result)=>{
        if(err)
        {
          console.log(err);
        }
        else
        {
          console.log(result);
          res.send({status:500});
        }
      });
  }
  catch(error){
  	console.log("error",error);
  }

})


var storage = multer.diskStorage({ 
  destination: function (req, file,cb) {
      
    const ftype=file.mimetype;
    if(ftype=='image/png' || ftype=='image/jpg' || ftype=='image/jpeg' && file.size>=1000000)
    {
        cb(null, './uploads/')
  
    }
    else
    {
        console.log('please select only PNG/ JPG/ JPEG file type and size <=1 MB');
    }
        
     },
    filename: function (req, file, cb) {
        fname= Date.now()+file.originalname;
        cb(null ,fname);
    }
});
var upload = multer({ storage: storage })

router.post("/createdish", upload.single('images'),async(req,res)=>{
  const {dishname}=req.body
  const {fieldname}=req.body
  const {images}="./Photo/"
  console.log(fieldname);

  try{
    const data=await dishModel.create(req.body,(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log(result);
        res.send({status:500});
      }
    })
  }
  catch(err){
   console.log("err",err);
  }
})
//all deta
router.get('/menulist',async(req,res)=>
 {
     const data= await dishModel
     .find({})
     //.populate("fieldname");
     res.send(data);
     console.log('menulist get Response');
 });

router.get(`/edit/:_id`,async function(req,res){

    const userdata=await dishModel.find({'_id':req.params});
    res.send(userdata);
    console.log('api hit');
    //console.log('api hit');
});


 router.put('/update/:_id',async(req,res)=>
 {
    const _id=req.params._id;
     let data= await dishModel.findByIdAndUpdate(_id, req.body,{useFindAndModify: false},
    (err, result)=>
     {
        if(err)
        {
            res.send(err);
            res.end();
            console.log('error occured');
            return;

        }
        else
        {
            res.send(
                {
                    status:200,
                    msg:'Data Sucessfully Updated '
                }
            );
            res.end();
            console.log('Thsi record updated',result);
            //console.log(data);
        }
     });
    // console.log(data);
     console.log('Yes API Hit');
 });
 
router.delete(`/delete/:_id`, async function(req,res){
  const _id=req.params._id
  const data=await dishModel.findByIdAndDelete(_id,(err,result)=>{
    if(err){
      res.send("error");
    }
    else{
      res.send("record successfully delete")

    }
  })
})


module.exports = router;

