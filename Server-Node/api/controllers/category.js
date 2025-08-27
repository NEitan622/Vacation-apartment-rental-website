import Category from "../models/category.js"


export const getAll=(req,res)=>{
Category.find()
    .then(categories=>{
        res.status(200).send(categories)
    })
    .catch(err=>{
        res.status(500).send({error:err.message})
    })
}
export const create=(req,res)=>{
    console.log("node!");
     const {name}=req.body
     console.log("node!")
     console.log(name)
    //  .where({ name: { $eq: name } })
    //  .then(categories => {
    //      if (categories.length > 0) {
    //         console.log(name+"e")
    //          return res.status(400).send({ error: 'category exists!' })
    //      }

         console.log(name)
     const newCategory= new Category({
        name
     })
     console.log(name)
     newCategory.save()
     // לבדוק אם קיימת קטגןריה 
        .then(category=>{
            res.status(200).send({message: `create category${category._id} succeed!`})
        })
        .catch(err=>{
            res.status(500).send({error:err.message})
        })
     
    // })
}