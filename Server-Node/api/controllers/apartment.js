
import Apartment from "../models/apartment.js"
import Category from "../models/category.js"
import City from "../models/city.js"
import Advertiser from "../models/advertiser.js"

export const add=async(req,res)=>{
    try{
     const{name,description,img,category,city,address
         ,numBeds,price,advertiser}=req.body
     
      const newApartment= new Apartment({
         name,
         description,
         img,
         category,
         city,
         address,
         numBeds,
         price,
         advertiser
     })
     const savedApartment = await newApartment.save();
       // עדכון הקטגוריה, העיר והמשווק
       const cat=await Category.findByIdAndUpdate(category, { $push: { apartments: savedApartment._id } });
       if(!cat)
         req.status(500).send({message:`category ${category} is not found`})
       const c=await City.findByIdAndUpdate(city, { $push: { apartments: savedApartment._id } });
       if(!c)
         req.status(500).send({message:`city ${city} is not found`})
       const a=await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: savedApartment._id } });
       if(!a)
         res.status(500).send({message:`advertiser ${advertiser} is not found`})
       res.status(200).send({message:`creat apartment ${savedApartment._id} succeed!!!!!!! all arraysApartment were update!`});
 }
 catch{
     res.status(500).send({ error: err.message });
 }
 
 }
 export const update =async (req, res) => {
    //try{
 const { id } = req.params
 Apartment.findByIdAndUpdate(id, req.body, { new: true })
 .then(apartment => {
    res.status(200).send({ message: `update apartment ${apartment._id} succeed!` })
})
.catch(err => {
    res.status(500).send({ error: err.message })
})
} 
export const remove = (req, res) => {

    const { id } = req.params

    Apartment.findByIdAndDelete(id)
        .then(async apartment => {
            let cat = await Category.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
            if (!cat) {
                return res.status(200).send({ message: `delete apartment ${apartment._id} succeed! update category failed!` })
            }
            let city = await City.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } })
            if (!city) {
                return res.status(200).send({ message: `delete apartment ${apartment._id} succeed! update city failed!` })
            }
            let adver = await Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { apartments: apartment._id } })
            if (!adver) {
                return res.status(200).send({ message: `delete apartment ${apartment._id} succeed! update advertiser failed!` })
            }
            res.status(200).send({ message: `delete apartment ${apartment._id} succeed! update category,city,advertiser succeed 😇😇🤓` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}

export const getAll=(req,res) =>{
    Apartment.find()
      .populate('category')
      .populate('city')
      .populate('advertiser')
 
        .then(apartments=>{
            res.status(200).send(apartments)
        })
        .catch(err=>{
            res.status(500).send({error:err.message})
        })
}
export const getById = (req, res) => {
    Apartment.findById(req.params.id)
      .populate('category')
      .populate('city')
      .populate('advertiser')
        .then(apartment => {
            if (!apartment) {
                return res.status(404).send({ error: `apartment not found!` })
            }
            res.status(200).send( apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getByCategoryId = (req, res) => {
  
    Category.findById(req.params.id)
        .populate('apartments')
        .then(category => {
            res.status(200).send(category.apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getByCityId = (req, res) => {
  
    City.findById(req.params.id)
        .populate('apartments')
        .then(city => {
            res.status(200).send(city.apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getByAdvertiserId = (req, res) => {
  
    Advertiser.findById(req.params.id)
        .populate('apartments')
        .then(advertiser => {
            res.status(200).send(advertiser.apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const numBedsBig = (req, res) => {
   const  numBeds =parseInt(req.params.num)
   Apartment.find({numBeds:{$gt:numBeds}
   })
           .then(apartments => {
            // let list = products.filter(p => p.price > 10)
            res.status(200).send( apartments )
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}
export const numBedsSmall = (req, res) => {
    const  numBeds =parseInt(req.params.num)
    Apartment.find({numBeds:{$lt:numBeds}
    })
            .then(apartments => {
             // let list = products.filter(p => p.price > 10)
             res.status(200).send( apartments )
         })
         .catch(error => {
             res.status(500).send({ error: error.message })
         })
 }
 export const numBedsEqual = (req, res) => {
    const  numBeds =parseInt(req.params.num)
    Apartment.find({numBeds:{$lt:numBeds}
    })
            .then(apartments => {
             // let list = products.filter(p => p.price > 10)
             res.status(200).send( apartments )
         })
         .catch(error => {
             res.status(500).send({ error: error.message })
         })
 }
 export const priceBig = (req, res) => {
    const  price =parseInt(req.params.price)
    Apartment.find({price:{$gt:price}
    })
            .then(apartments => {
             // let list = products.filter(p => p.price > 10)
             res.status(200).send(apartments )
         })
         .catch(error => {
             res.status(500).send({ error: error.message })
         })
 }
 export const priceSmallEq = (req, res) => {
     const  price =parseInt(req.params.price)
     Apartment.find({price:{$lte:price}
     })
             .then(apartments => {
              // let list = products.filter(p => p.price > 10)
              res.status(200).send( apartments )
          })
          .catch(error => {
              res.status(500).send({ error: error.message })
          })
  }

