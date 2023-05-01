const mongoose = require('mongoose')

const ContactSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true

    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    tel:{
        type:String,
        require:true
    },
    address: {
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    idUser:{
        type:String,
        require:true
    }


})




module.exports=mongoose.model('Contact',ContactSchema) ;