import { Router } from 'express'
import { createUser, getUser, getUserById} from '../controllers/User'

const router = Router()

router.get('/', getUser)

router.get('/:id', getUserById)

router.post('/create-user', createUser)

export default router