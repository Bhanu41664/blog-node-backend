const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors =  require('cors');
const path = require('path');
const authRoute = require("./rootes/auth");
const userRoute = require("./rootes/Users");
const postRoute = require("./rootes/Posts");
const CategoriesRoute = require("./rootes/Categories");
const questinoRoute=require("./rootes/Question");
const multer = require("multer");
const UserModel = require("./models/User");

const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connectd sunccesfully"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    let name = Date.now().toString() + file.originalname;
    req.body.filePath = name; 
    cb(null, name);
  },
});
const upload = multer({ storage: storage });


app.post("/upload", upload.single("file"), (req, res) => {
console.log('Image Uploading Started');
console.log(req.body.filePath);
return res.status(200).json("file uploaded succesfully");
})


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", CategoriesRoute);
app.use("/api/question",CategoriesRoute);

app.listen(process.env.PORT, () => {
  console.log("backend is running @ port : "+process.env.PORT);
});

app.get('/', (req, res) => {
    res.send('Hello 👋')
});

// Serve Static Files 
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app