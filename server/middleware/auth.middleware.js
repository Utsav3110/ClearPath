import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js'


export const verifyJWT = async (req , res , next ) =>{
    try {
       
             const token = req.cookies?.accessToken 
    
                if(!token){
                    throw new Error(" anathorized request")
                }
                
              const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)      
        
               const user =  await User.findById(decodedToken?._id).select("-password -refreshToken")
             
                if(!user){
                    throw new Error("Invalid Access Token ")   
                }
             
                req.user = user;
              
                next()
    } catch (error) {
        console.log(error);
    
        throw new Error( error?.message || "Invalid Input") 
    }
    
}
    
    