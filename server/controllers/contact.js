const { reset } = require('nodemon')
const Contact =require('../models/contact')







const create=async(req,res,filename)=>{
    try{
        data=req.body
        newData=new Contact(data)
        newData.image=filename
        savedData= await newData.save()
        res.send(savedData)


    }catch(err){
        res.send(err)
    }
}

const getByIdUser=async(req,res)=>{
    try{
        let { iduser }=req.params ;
        result= await Contact.find({ idUser:iduser })
        res.send(result)


    }catch(err){
        res.send(err)
    }

}
const getById=async(req,res)=>{
    try{
        
        result= await Contact.find({_id:req.params.id})
        res.send(result)


    }catch(err){
        res.send(err)
    }

}

const del=async(req,res)=>{
    try{
        
        result= await Contact.findByIdAndDelete({_id:req.params.id})
        res.send(result)


    }catch(err){
        res.send(err)
    }

}

const update=async(req,res,filename)=>{
    try{
        let {id}=req.params
        newData=req.body
        if(filename.length > 0){
            newData.image=filename;
        }
        result= await Contact.findByIdAndUpdate({_id:id},newData)
        res.send(result)


    }catch(err){
        res.send(err)
    }
}



module.exports={create,getByIdUser,getById,del,update}