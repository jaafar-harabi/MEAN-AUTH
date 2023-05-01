const express= require('express')

const {verifyToken}=require('../config/auth')

const router=express.Router()
const multer = require('multer') 

const {create,getByIdUser,getById,del,update}=require('../controllers/contact')


filename=''
const mystorage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,redirect)=>{
    filename=Date.now()+'.'+file.mimetype.split('/')[1];
    redirect(null,filename)
    }
})

const upload=multer({storage:mystorage})

router.post('/create',verifyToken,upload.single('image'),(req,res)=>{
    create(req,res,filename) ;
    filename=''
})


router.get('/getbyiduser/:iduser',verifyToken,getByIdUser)

router.get('/getbyid/:id',verifyToken,getById)

router.delete('/delete/:id',verifyToken,del)

router.put('/update/:id',upload.single('image'),(req,res)=>{
    update(req,res,filename) ;
    filename=''
})

module.exports=router;