import express from 'express'
import { deleteUserById, getAllUsers, updateUser } from '../controllers/users'
import { isAuthenticated } from '../middleware'

const router = express.Router()

router.get('/', isAuthenticated, getAllUsers)

router.get('/delete/:id', isAuthenticated, deleteUserById)

router.patch('/:id', isAuthenticated, updateUser)

export default router