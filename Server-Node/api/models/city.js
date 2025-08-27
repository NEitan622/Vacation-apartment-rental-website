import mongoose from "mongoose";

const citySchema=new mongoose.Schema({
    // עיר:  שם עיר, מערך דירות
    name:{
        type:String,
        required:true,
        match:/^[א-ת]{2}[א-ת" "]{0,20}$/,
    }
    ,apartments:[{
        type: mongoose.Types.ObjectId,
         ref:'Apartment',
   }]
    
})
export default mongoose.model('City',citySchema)