import bcryptjs from 'bcryptjs'
import { User } from '../../models/User.js';
import jwt from 'jsonwebtoken'

// register
export const register = async (req, res) => {
    const { userName, email, password } = req.body;
    console.log(req.body.userName, req.body.email, req.body.password)
    try {
        const checkUser = await User.findOne({ email })
        if (checkUser) return res.json({ sucess: false, message: "User Already exists eith the same email Please try again..." })
        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ userName, email, password: hashPassword })
        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Registration successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

// login

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const checkUser = await User.findOne({ email })
        if (!checkUser) return res.json({ sucess: false, message: "User doesn't exists! Please register first" })
        const checkPassword = await bcryptjs.compare(password, checkUser.password)
        if (!checkPassword) {
            res.json({ sucess: false, message: "Incorrect Password! Please try again" })
        }
        const token =await jwt.sign({ id: checkUser._id, role: checkUser.role, email: checkUser.email }, "CLIENT_SECRET_KEY", { expiresIn: '60m' })
        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Login in successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

export const logout=async(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:"Logout successfully!!"
    })
}

// middleware auth

export const authMiddleware=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token) return res.status(401).json({success:false,message:"Unauthorised user"})
        try {
            const decoded=await jwt.verify(token,'CLIENT_SECRET_KEY')
            req.user=decoded;
            next();
        } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: 'Some error occured'
        })
        }
}