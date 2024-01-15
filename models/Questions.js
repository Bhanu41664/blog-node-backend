const mongoose =require("mongoose")
const questionSchema = new mongoose.Schema({
    databasename:{
        type:String,
        required:true,
        
    },
    question:{
        type:String,
        required:true,
        
    },
    answer:{
        type:String,
        required:true

    }
   

},{timestamps:true});

module.exports=mongoose.model("Question",questionSchema)
