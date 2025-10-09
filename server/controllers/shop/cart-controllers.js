import { Cart } from "../../models/Cart.js"
import { Product } from "../../models/Product.js"



export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data Provided!!'
            })
        }
        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found'
            })
        }

        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity })
        } else {
            cart.items[findCurrentProductIndex].quantity += parseInt(quantity)
        }
        await cart.save();
        return res.status(200).json({
            success: true,
            data: cart
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

export const fetchCartItem = async (req, res) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            res.status(400).json({
                success: false,
                message: 'User id is manadatory'
            })
        }
        const cart = await Cart.findOne({userId}).populate({
            path: 'items.productId',
            select: "image title price salePrice"
        })

        if (!cart) {
            res.status(404).json({
                success: false,
                message: 'Cart is Not Found'
            })
        }

        const validItems = cart.items.filter((productItem) => productItem.productId)
        if (validItems.length < cart.items.length) {
            cart.items = validItems
            await cart.save();
        }

        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
        }))
        res.status(200).json({
            success: true,
            data: { ...cart._doc, items: populateCartItems }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

export const updateCartItemQty = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || (!quantity < 0)) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart is Not Found"
            })
        }
        //  get product id for each prdocut
        const findCurrentProductIndex = cart.items.findIndex(items => items.productId.toString() === productId)

        if (findCurrentProductIndex === -1) {
            res.status(404).json({
                success: false,
                message: "Cart is Not Found"
            })
        }

        cart.items[findCurrentProductIndex].quantity = parseInt(quantity)
        await cart.save();
        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        })

        //  product detail update
        const populateCartItems = cart.items.map(items => ({
            productId: items.productId ? items.productId._id : null,
            image: items.productId ? items.productId.image : null,
            title: items.productId ? items.productId.title : 'Product Not Found',
            price: items.productId ? items.productId.price : null,
            salePrice: items.productId ? items.productId.salePrice : null,
            quantity: items.quantity
        }))

        return res.status(200).json({
            success: true,
            data: { ...cart._doc, items: populateCartItems }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { userId, productId } = req.params
        if (!userId || !productId) {
            return res.status(500).json({
                success: false,
                message: "Invalid data provided"
            })
        }
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'title price salePrice image'
        })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }
        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)
        await cart.save()

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        })

        //  product detail update
        const populateCartItems = cart.items.map(items => ({
            productId: items.productId ? items.productId._id : null,
            image: items.productId ? items.productId.image : null,
            title: items.productId ? items.productId.title : 'Product Not Found',
            price: items.productId ? items.productId.price : null,
            salePrice: items.productId ? items.productId.salePrice : null,
            quantity: items.quantity
        }))

        return res.status(200).json({
            success: true,
            data: { ...cart._doc, items: populateCartItems }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}