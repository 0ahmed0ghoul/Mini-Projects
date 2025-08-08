const express  = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose');

const authRouter =  require('./routers/authRouter')
const postRouter =  require('./routers/postRouter')

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to mongobd atlas");
}).catch(err=>{
    console.log(err);
})
const app =express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)

app.get("/",(req,res)=>{
    res.json({message : 'hello from server'})
})

app.listen(process.env.PORT,()=>{
    console.log("listening...");
})