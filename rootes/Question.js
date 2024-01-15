const router = require("express").Router();
const Question = require("../models/Questions");
router.post("/", async (req,res)=>{
    const newQuestion= new Question(req.body);
    try{
        console.log(newQuestion);
        const savedQuestion=await newQuestion.save();
        res.status(200).json(savedQuestion)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//getting data
router.get("/", async (req,res)=>{
    try{
        const question=await question.find();
        res.status(200).json(question)
    }
    catch(err){
        res.status(500).json(err)
    }
})
module.exports = router