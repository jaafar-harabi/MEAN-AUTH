const express=require('express')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
require('./config/connect')

const userRoute=require('./routes/user')
const contactRoute=require('./routes/contact')
app.use(express.json())
app.use(cors())
app.use('/user',userRoute)
app.use('/contact',contactRoute)

app.use('/image',express.static('./uploads'))










app.listen(process.env.PORT||3000,()=>{console.log('connect to port')})