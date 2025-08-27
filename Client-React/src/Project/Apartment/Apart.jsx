// ,show onClick={() => show(apartment._id)}
import './style.css'
export const Apart=({apartment})=>{

 
    return <>
     <div   >
{/* { console.log(apartment)
}  */}
<div className="card">
   
     {apartment.name && <p className="name" >{apartment.name}</p>}
     {apartment.img&&<img className="img" src={`${process.env.PUBLIC_URL}/pic/${apartment.img}.png`}></img>}
     {apartment.city && <p className="card-text">{apartment.city.name}</p>}
     {apartment.address && <p className="card-text">{apartment.address}</p>}
     {apartment.category && <p className="card-text">{apartment.category.name}</p>}
     {apartment.price && <p className="card-text">{apartment.price}</p>}
     {apartment.numBeds && <p className="card-text">{apartment.numBeds}</p>}
     {apartment.advertiser && <p className="card-text">{apartment.advertiser.email}</p>}


</div>
</div>
</>
}