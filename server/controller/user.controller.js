import { User } from "../model/user.model.js";

const generateAccessandRerershToken = async (userId) => {
    try{
     
      const user = await User.findById(userId)
      
      const accessToken = user.generateAccessToken()
      
      const refreshToken =  user.generateRefreshToken()
     
      user.refreshToken = refreshToken
      
      await user.save({validateBeforeSave : false})
      
      return { accessToken , refreshToken}
    }catch(error){
        throw new Error(`Error generating tokens: ${error.message}`);
    }
}



const registerUser = async (req, res) => {
  try {
    // Destructuring
   
    const { fullName, email, username, password } = req.body;


    // Validation
    if (![fullName, email, username, password].every((field) => field?.trim())) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Checking if user already exists in the database
    const existUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
    });

    if (existUser) {
      return res.status(400).json({ message: "User already exists, please try to log in" });
    }

    // Creating a new user
    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      username: username.toLowerCase()
    });

    // Return created user without password and refreshToken fields
    const userCreated = await User.findById(newUser._id).select("-password -refreshToken");

    return res.status(201).json({
      message: "User registered successfully",
      user: userCreated
    });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


const loginUser = async (req, res) => {
    try {
      const { email, username, password } = req.body;
  
      if (!(username || email)) {
        return res.status(400).json({ message: "Username or email is required" });
      }
  
      // Find user by email or username
      const user = await User.findOne({
        $or: [{ username }, { email }]
      });
  
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      // Validate the password
      const isPasswordValid = await user.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect password" });
      }
  
      // Generate access and refresh tokens
      const { accessToken, refreshToken } = await generateAccessandRerershToken(user._id);
  
      // Return the user details without password and refreshToken fields
      const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
     
      return res
        .status(200)
        .cookie("accessToken", accessToken, { httpOnly: true,sameSite: 'None' , secure: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: 'None' ,secure: true })
        .json({
          message: "User logged in successfully",
          user: loggedInUser,
          accessToken,
          refreshToken
        });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };

  const logoutUser = async (req, res) => {
    try {
      // Clear the refreshToken for the user
      await User.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: undefined }
      }, {
        new: true
      });
  
      // Clear cookies
      return res
        .status(200)
        .clearCookie("accessToken", { httpOnly: true,  })
        .clearCookie("refreshToken", { httpOnly: true, })
        .json({ message: "User logged out successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
  

  const currentUser = async(req, res)=>{
    
   try {
         
     const user = await User.findById(req.user._id)

     return res
     .status(200)
     .json({
       user
     })
   } catch (error) {
      return res.status(500).json({ message: "Something went wrong", error: error.message });
   }
  }


export { registerUser, loginUser, logoutUser,currentUser };
