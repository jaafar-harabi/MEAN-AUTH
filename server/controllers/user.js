const User=require('../models/user'); 
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken') ;


const login=async(req,res)=>{
    try{
        let {email,password}=req.body
        user= await User.findOne({email:email})
        if (!user){
            return res.send('invalid')
        }
        validPass=bcrypt.compareSync(password,user.password)
        if(!validPass){
            return res.send('invalid')
        }
        payload={
            name:user.name,
            lastname:user.lastname,
            email:user.email,
            password:user.password,
            _id:user._id
        }
        token=jwt.sign(payload,'12345678')
        res.send({mytoken:token})



    }catch(err){
        res.send(err)
    }
}



const register=async(req,res)=>{
    try{
        data = req.body
        validEmail=await User.findOne({email:data.email})
        if(validEmail){
            return res.send({error:'invalid'})
        }
        user=new User(data)
        user.password=bcrypt.hashSync(data.password,10)
        savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.send(err)
    }
}



module.exports={login,register}