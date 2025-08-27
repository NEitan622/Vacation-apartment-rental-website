import mongoose from "mongoose";

const advertiserSchema=new mongoose.Schema({
    //to chack how to do this match!!!!!!!!!!!!!
    // אימייל - ייחודי, סיסמה, טלפון, טלפון נוסף – לא חובה, מערך דירות
    email:{
        type:String,
        required:true,
        // unique:true,
        // match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        // יחודי
    },
    password:{
        type:String,
        required:true,
        minLength: 8
        // match
    },
    phoneNumber:{
        type:String,
        required:true,
        // match:/^[0-9]{9,10}$/,
    
    }
    ,
    phoneNumber2:{
        type:String,
        // pattern:"\{9,10}",
        // match:/^[0-9]{9,10}$/,
    }
    ,
    apartments:[{
        type: mongoose.Types.ObjectId,
         ref:'Apartment',
         required:true
   }],
   
})
export  default mongoose.model('Advertiser',advertiserSchema)
