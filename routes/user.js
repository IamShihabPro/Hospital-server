import express from 'express'
import {updateUser, deleteUser, getSingleUser, getAllUser} from '../controllers/userController.js'

const router = express.Router()
router.get('/', getAllUser)
router.get('/:id', getSingleUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router;