const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
//Create

router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedpost = await newPost.save();
    return res.status(200).json(savedpost);
  } catch (err) {
    return res.status(400).json("post is not send");
  }
});
//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedPost);
    }
    else {
        res.status(400).json('Not Allowed')
    }
  } catch (err) {
    return res.status(400).json(err,err.message);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await Post.findById(req.params.id);
      try {
       
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json("deleted succesfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      return res.status(404).json("USER is not found");
    }
  } else {
    res.status(401).json("you can Delete only your account");
  }
});
//Get Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { password, ...others } = post._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(404).json("user is not found");
  }
});
//get all post
router.get("/", async (req, res) => {
    const username =req.query.user;
    const catName=req.query.cat;
    try {
      let posts;
      if(username)
      {
        posts=await Post.find({username:username})
      }
      else if(catName)
      {
        posts=await Post.find({categories:{
            $in:[catName]
        }})
      }
      else{
        posts =await Post.find();
      }
      return res.status(200).json(posts)
    } catch (err) {
      return res.status(404).json("user is not found");
    }
  });
module.exports = router;
