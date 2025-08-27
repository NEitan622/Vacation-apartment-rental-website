import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import categoryRouter from './api/routers/category.js'
import apartmentRouter from './api/routers/apartment.js'
import cityRouter from './api/routers/city.js'
import advertiserRouter from './api/routers/advertiser.js'

import bodyParser from 'body-parser'

import mongoose from 'mongoose';

const app=express()
const port=3001
// מכיר את משתני הסביבה
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
mongoose.connect(process.env.CONNECT_MONGODB)
.then(()=>{
    console.log('connect to mongoDB! ☺️');
})
.catch(err=>{
   console.log({error: err.message});
   
    
})
app.use('/category',categoryRouter)
app.use('/apartment',apartmentRouter)
app.use('/city',cityRouter)
app.use('/advertiser',advertiserRouter)

app.listen(port,()=>{
    console.log(`my applicatoin run in http://localhost:${port}`);
    
})
