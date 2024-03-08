import express from 'express'
import {updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctor} from '../controllers/doctorController.js'

const router = express.Router()
router.get('/', getAllDoctor)
router.get('/:id', getSingleDoctor)
router.put('/:id', updateDoctor)
router.delete('/:id', deleteDoctor)

export default router;