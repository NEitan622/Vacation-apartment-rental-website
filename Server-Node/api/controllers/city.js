import City from "../models/city.js"

export const getAll=(req,res)=>{
    City.find()
        .then(cities=>{
            res.status(200).send(cities)
        })
        .catch(err=>{
            res.status(500).send({error:err.message})
        })
    }
export const add=(req,res)=>{
   
    const{name}=req.body

    // .where({ name: { $eq: name } })
    // .then(cities => {
    //     if (cities.length > 0) {
    //         return res.status(400).send({ error: 'name exists!' })
    //     }

    const newCity=new City({
        name
    })

    newCity.save()
   
    .then(city=>{
        res.status(200).send({message:`create city ${city._id} succeed`})
    })
    .catch(err=>{
        res.status(500).send({error: err.message})
    })
// })
}