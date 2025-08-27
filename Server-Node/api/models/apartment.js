import mongoose from "mongoose"

const apartmentSchema=new mongoose.Schema({
    //  שם – לא חובה, תיאור, תמונה, קוד קטגוריה, קוד עיר, כתובת, מס' מיטות, תוספים, מחיר, קוד מפרסם
    name:{
        required:true,
        type:String,
        match:/^[א-ת]{2}[א-ת" "]{0,20}$/,
    },
    description:{
        
        type:String,
        match:/^[א-ת]{2}[א-ת" "]{0,100}$/,
        
    },
    img:{
     type:String,
     required:true   
    },
    category:{
      type: mongoose.Types.ObjectId,
      required:true,
      ref:'Category'
    },
    city:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'City'
    },
    address:{
         type:String,
         match:/^[א-ת]{2}[א-ת" "]{0,20}$/,
         required:true,

    },
    numBeds:{
        type:Number

    },
    price:{
        type:Number
        
    },
    advertiser:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'Advertiser'
    }
   

})
export default mongoose.model('Apartment',apartmentSchema)