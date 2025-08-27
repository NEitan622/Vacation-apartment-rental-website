import Category from './models/category.js'
import City from './models/city.js'
import Advertiser from './models/advertiser.js'
import jwt, { decode } from 'jsonwebtoken'

export const categoryExists = (req, res, next) => {
    const { category } = req.body

    if (!category && req.method == 'PATCH') {
        return next()
    }

    Category.findById(category)
        .then(category => {
            if (!category) {
                return res.status(404).send({ error: `city not found!` })
            }
            next()
        })
        .catch(error => {
            return res.status(500).send({ error: error.message })
        })
}
export const cityExists = (req, res, next) => {
    const { city } = req.body

    if (!city && req.method == 'PATCH') {
        return next()
    }

    City.findById(city)
        .then(city => {
            if (!city) {
                return res.status(404).send({ error: `city not found!` })
            }
            next()
        })
        .catch(error => {
            return res.status(500).send({ error: error.message })
        })
}
export const advertiserExists = (req, res, next) => {
    const { advertiser } = req.body

    if (!advertiser && req.method == 'PATCH') {
        return next()
    }

    Advertiser.findById(advertiser)
        .then(advertisers => {
            if (!advertisers) {
                return res.status(404).send({ error: `advertiser not found!` })
            }
            next()
        })
        .catch(error => {
            return res.status(500).send({ error: error.message })
        })
}
export const checkAuth = (req, res, next) => {
console.log("checkAuth");

    if (!req.headers.authorization) {
        // Authorization - הרשאה
        return res.status(401).send('Authorization failed!')
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        console.log("checkAuth");
        return res.status(401).send('Authorization failed!')
    }

    // אימות של הטוקן - קיים - תקין ותקף
    // decoded - פיענוח
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            // authentication - אימות
            return res.status(401).send('Authentication failed!')
        }
        if (decoded) {
            // decoded - מכיל את הנתונים של המשתמש לפיהם נוצר הטוקן
            // במקרה הצורך נשמור את הנתונים באובייקט הבקשה
            next()
        }
    })
}