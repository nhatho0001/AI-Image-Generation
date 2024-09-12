import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';
import bodyParser from "body-parser";

const port = 3000
dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connect Successful!')
}
).catch((error)=>{
    console.log(error)
})
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/postRoutes' , postRoutes)
app.use('/api/v1/dalleRoutes' , dalleRoutes)

app.get('/' , (req , res , next)=>{
    res.send('Hello form Dell-E')
})

app.listen(port ,()=>{
    console.log(`welcome connect to ${port}`)
})