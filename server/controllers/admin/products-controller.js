import { ImageUploadUtils } from "../../helpers/cloudinary.js";
import { Product } from "../../models/Product.js";

export const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64
        const result = await ImageUploadUtils(url);
        res.json({
            success: true,
            result
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error Occured"
        })
    }
}

// add new product
export const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body
        const newlyCreatedProduct = new Product({ image, title, description, category, brand, price, salePrice, totalStock })
        await newlyCreatedProduct.save()
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error Occured"
        })
    }
}


// fetch all product
export const fetchAllProduct = async (req, res) => {
    try {
        const listOfProduct = await Product.find({})
        res.status(200).json({
            success: true,
            data: listOfProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error Occured"
        })
    }
}

// edit product

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body
        const findProduct = await Product.findById({ id })
        if (!findProduct) return res.status(404).json({ success: false, message: "Product Not Found" })
        Product.title = title || findProduct.title
        Product.description = description || findProduct.description
        Product.category = category || findProduct.category
        Product.brand = brand || findProduct.brand
        Product.price = price || findProduct.price
        Product.salePrice = salePrice || findProduct.salePrice
        Product.totalStock = totalStock || findProduct.totalStock
        Product.image = image || findProduct.image
        await findProduct.save()
        res.status(200).json({
            status: true,
            data: findProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error Occured"
        })
    }
}

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete({ id })
        if (!product) return res.status(404).json({ success: false, message: "Product not found" })
        res.status(200).res({
            success: true,
            message:"Product delete successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error Occured"
        })
    }
}