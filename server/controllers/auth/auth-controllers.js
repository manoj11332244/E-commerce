import bcryptjs from 'bcryptjs'
import { User } from '../../models/User.js';

// register
export const register=async(req,res)=>{
    const {userName,email,password}=req.body;
    try {
        const hashPassword=await bcryptjs.hash(password,12);
        const newUser=new User({userName,email,password:hashPassword})
        await newUser.save()
        res.status(200).json({
            suucess:true,
            message:"Registration successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Some error occured'
        })
    }
}

// login

export const login=async(req,res)=>{
  const [email,password]=req.body;
     try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Some error occured'
        })
    }
}