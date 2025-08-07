import express from 'express'
import { register } from '../../controllers/auth/auth-controllers.js'

const router=express.Router()


router.post('/signup',register)


export default router