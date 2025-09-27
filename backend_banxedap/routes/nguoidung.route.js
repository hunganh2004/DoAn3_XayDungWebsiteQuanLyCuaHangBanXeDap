
import express from 'express'
const router = express.Router()
import controller from '../controllers/nguoidung.controller.js'
import authenticateToken from './middleware.js'

router.get('/pagination/search', controller.getPaginationSearch)
router.get('/all', controller.getAll)
router.get('/search', controller.getSearch)
router.get('/pagination', controller.getPagination)
router.post('/login', controller.getUserByPassword)
router.get('/:id', controller.getById)
router.post('/', controller.insert)
router.put('/', controller.update)
router.delete('/:id', controller.delete)

export default router