import express from 'express'
import { add, getAll, getByAdvertiserId, getByCategoryId, getByCityId, getById, numBedsBig, priceBig, priceSmallEq, remove, update } from '../controllers/apartment.js'
import { advertiserExists, categoryExists, checkAuth, cityExists } from '../middlewares.js'
const router= express.Router()
router.post('',checkAuth,categoryExists,cityExists,advertiserExists, add)
router.patch('/:id',checkAuth,categoryExists,cityExists,advertiserExists,update)
router.delete('/:id',checkAuth, remove)
router.get('/', getAll)
router.get('/:id', getById)
router.get('/getByCategoryId/:id', getByCategoryId)
router.get('/getByCityId/:id', getByCityId)
router.get('/getByAdvertiserId/:id', getByAdvertiserId)
router.get('/numBedsBig/:num', numBedsBig)
router.get('/numBedsSmall/:num', numBedsBig)
router.get('/numBedsEqual/:num', numBedsBig)
router.get('/priceBig/:price', priceBig)
router.get('/priceSmallEq/:price', priceSmallEq)
export default router