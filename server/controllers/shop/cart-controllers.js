import { Cart } from "../../models/Cart.js"
import { Product } from "../../models/Product.js"



const addToCart=async(req,res)=>{
    try {
        const {userId,productId,quantity}=req.body;
        if(!userId || !productId || quantity<=0){
            return res.status(400).json({
                success: false,
                message:'Invalid data Provided'
            })
        }
        const product=await Product.findById(productId)

        if(!product){
            return res.status(404).json({
                success: false,
                message:'Product Not Found'
            })
        }

        let cart=await Cart.findOne({userId})
            if(!cart){
                cart=new Cart({userId,items:[]})
            }
        const findCurrentProductIndex= cart.items.findIndex(item=>item.productId.toString()===productId)
        if(findCurrentProductIndex===-1){
            cart.items.push({productId,quantity})
        }else{
            cart.items[findCurrentProductIndex].quantity+=quantity
        }

        await cart.save();
        return res.status(200).json({
            success:true,
            data:cart
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}

const fetchCartItem=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}

const updateCartItemQty=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}

const deleteCart=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Error'
        })
    }
}