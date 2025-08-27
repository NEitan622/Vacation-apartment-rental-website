import express from "express"
import { add, getAll } from "../controllers/city.js"
import { checkAuth } from "../middlewares.js"

const router= express.Router()
 router.get('',getAll)
 router.post('',checkAuth,add)
 export default router