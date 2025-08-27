// req-בקשה  res-תשובה
import Advertiser from "../models/advertiser.js"
import jwt from 'jsonwebtoken'


export const register = (req, res) => {

    const { email,password,phoneNumber,phoneNumber2,apartments} = req.body

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(advertisers => {
            if (advertisers.length > 0) {
                return res.status(400).send({ error: 'email exists!' })
            }

            const newAdvertiser = new Advertiser({
                email,
                password,
                phoneNumber,
                phoneNumber2,
                apartments
            })

            // פונקציית הוספה - מופעלת על האובייקט
            newAdvertiser.save()
                .then(async advertiser => {

                    // create token
                    // מקבלת שלשה פרמטרים:
                    // 1. נתונים של המשתמש שנכנס - ניתן לפענח את הטוקן ולשלוף את הנתונים ולכן לא נשמור נתונים רגישים
                    // 2. מחרוזת יחודית למערכת
                    // 3. אובייקט אפשרויות - ניתן להגדיר תוקף לטוקן
                    // בשביל לתפוס את הטוקן שנוצר שלא יחזור אובייקט ריק await הגדרנו 
                    // async מסיבה זו הוצרכנו להגדיר על הפונקציה החיצונית - שמפעילה את יצירת הטוקן
                    const token = await jwt.sign(
                        { email, phoneNumber },
                        process.env.SECRET,
                        {
                            expiresIn: '1hr', // hours
                            // expiresIn: '10m', // minutes
                            // expiresIn: '30d', // days
                            // expiresIn: '20ms', // mili seconds
                            // expiresIn: '60s' // seconds
                        }
                    )

                    res.status(200).send({ advertiser, token })
                })
                .catch(err => {
                    res.status(500).send({ error: err.message })
                })
        })
}

export const login = (req, res) => {

    // שליפה מאובייקט ג'סון לפי שם מפתח
    const { email, password } = req.body

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(async advertisers => {
            if (advertisers.length == 0) {
                console.log('email not found!');
                return res.status(404).send({ error: `email and password are not match!` })
            }
            let [advertiser] = advertisers
            if (advertiser.password !== password) {
                console.log('password is not match!');
                return res.status(404).send({ error: `email and password are not match!` })
            }

            const token = await jwt.sign(
                {email},
                process.env.SECRET,
                {
                    expiresIn: '1hr', // hours
                
                }
            )

            res.status(200).send({ advertiser, token })

        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}