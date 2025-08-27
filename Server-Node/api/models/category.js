import mongoose from "mongoose";

const categotrSchema=new mongoose.Schema({
    // קטגוריה: שם קטגוריה (צי/מר, יחידת אירוח, דירה להשכרה...), מערך דירות
    name:{
        required:true,
        type:String,
         match:/^[א-ת]{2}[א-ת" "]{0,20}$/,
         
       
    }
    ,apartments:[{
        // required:true,
         type: mongoose.Types.ObjectId,
          ref:'Apartment',
          
    }],
    
})
export default mongoose.model('Category',categotrSchema)