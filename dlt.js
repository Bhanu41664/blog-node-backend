const User = require("./models/User");


const add = async () => {
    let user = null;
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            user = {
                name : 'udaykiran'
            }
            resolve(user);
        }, 1000);
    });
}

try{
    let data = await add();
    console.log(data);
}catch(e){
    console.log(e);
}


    const salt = await bcrypt.genSalt(10);
    const {username, email,password} = req.body;

    if(!username || !email || !password) {
      return res.status(400).json('All fields are required');
    }

    const temp = await User.findOne({username: username});
    if(temp){
      return res.status(400).json('Username is taken!');
    }
    const hashedPass=await bcrypt.hash(req.body.password, salt);
    const newUser=new User(
    {
        username:username,
        email:email,
        password:hashedPass
    }
    )
    
    newUser.save()
    .then(() => {

    })
    .catch(() => {
        
    })

    const user=await newUser.save();
    res.status(200).json(user)
  catch(err)
  {
    console.log(err);
  }

