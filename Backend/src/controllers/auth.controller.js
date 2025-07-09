const User = require("../models/user.model.js")
const bcrypt = require("bcryptjs");
const generatejwt = require("../utils/generatetoken.js");


const signup = async(req,res)=>{
   try {
    const { fullName, email, password, role, longitude, latitude , phonenumber} = req.body;
     if(!fullName || !email || !password || !role || !longitude || !latitude || !phonenumber){
        return res.status(400).json({message : "allfields are mandaotary"});
     }
     if(password.length < 6){
         return res.status(400).json({message : "password must be atleast 6 characters"});
     }
 
     const user = await User.findOne({email});
     if(user){
         return res.status(400).json({message : "user already exists"});
     }
     const salt = await bcrypt.genSalt(10);
     const hashpassword = await bcrypt.hash(password,salt);
 
     const newuser = await User({
         fullName : fullName,
         email : email ,
         password : hashpassword,
         role : role,
        location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      phonenumber : phonenumber
     })
 
     if(newuser){
        
       await  generatejwt(newuser._id, res);
        await newuser.save();
        
    res.status(201).json({
            id  : newuser._id,
            fullName : newuser.fullName,
            email : newuser.email,
            role : newuser.role,
            phonenumber : phonenumber
         })
     }
     else{
         return res.status(400).json({message : "invalid credantils"});
     }
   } catch (error) {
        console.log("error in signup controller " , error.message);
        res.status(500).json({message : "Internal server error"});
    
   }

}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await generatejwt(user._id);

    return res.status(200).json({
      token, 
      fullName: user.fullName,
      id: user._id,
      email: user.email,
      profilepic: user.profilepic,
      role : user.role
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const logout = async(req,res)=>{
try {   
    const options = {
        httpOnly : true,
        secure : true,
        
    };
        res.cookie("jwt","",options);
        res.status(200).json({message : "logged out succesfully"});
} catch (error) {
    console.log("error in logout controller" , error.message);
    res.status(500).json({message : "internal server error"});
    
}
    
}

const checkauth = async(req,res)=>{
    try {
       res.status(200).json(req.user);
        
    } catch (error) {
        console.log("error in checkauth controller ",error.message);
        res.status(500).json("internal server error");
    }
}

const profile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "fullName email bloodType phonenumber role"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = {signup , login , logout ,checkauth ,profile};