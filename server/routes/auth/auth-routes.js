import express from 'express'
import { loginUser, register } from '../../controllers/auth/auth-controllers.js'

const router=express.Router()


router.post('/signup',register)
router.post('/login',loginUser)


export default router