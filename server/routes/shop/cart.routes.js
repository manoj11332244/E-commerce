import express from 'express'
import {addToCart, deleteCart, fetchCartItem, updateCartItemQty} from '../../controllers/shop/cart-controllers.js'

const router=express.Router()

router.post('/add',addToCart)
router.get('/get/:usedId',fetchCartItem)
router.put('/update-cart',updateCartItemQty)
router.delete('/:userId/:productId',deleteCart)


export default router;
