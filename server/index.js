import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './db/db.js'

import AuthRoute from './routes/auth/auth-routes.js'
import adminProductRoute from './routes/admin/product-routes.js'
import shopProductRoute from './routes/shop/products-routes.js'
import cartProductRoute from './routes/shop/cart.routes.js'
import addressProductRoute from './routes/shop/address-routes.js'

dotenv.config({});

const app=express()
const PORT=process.env.PORT || 4000

connectDB()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders:["Authorization","Content-Type","Cache-Control","Expires","Pragma"],
    credentials:true
}))


app.use('/api/auth',AuthRoute)
app.use('/api/admin/products',adminProductRoute)
app.use('/api/shop/products',shopProductRoute)
app.use('/api/shop/cart',cartProductRoute)
app.use('/api/shop/address',addressProductRoute)

app.listen(PORT,()=>{
    console.log(`This Server PORT : ${PORT}`)
})