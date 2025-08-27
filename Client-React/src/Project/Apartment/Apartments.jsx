import { useEffect, useState } from "react"
import { getApartments, getByCityId, getCities, priceSmallEq } from "../api"
import { Apart } from "./Apart"
import './style.css'
// import { Details } from "./Details"

export const Apartments = () => {

    // הגדרת מערך ששולף את כל המאמרים מהרידקס
    // const list = useSelector(x => x.article.list)

    const [list, setList] = useState()
    const [allCities, setAllCities] = useState()
    const [idCity, setIdCity] = useState()
    const [priceList, setPriceList] = useState()

    //const [select, setSelect] = useState()

    // שליפה מהשרת של כל הכתבות
    // שמירה ברידקס
    // 
    // בעת טעינה
    useEffect(() => {
        // קריאת שרת
        getApartments()
            .then(x => {
                setList(x.data)
                console.log(x.data);
                // console.log(list);
                
            })
            .catch(err => {
                console.log(err);
            })
        getCities()
            .then(x => {
                setAllCities(x.data)
                console.log(x.data);
                // console.log(list);
                
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
const getByCId=(id)=>{
    getByCityId(id)
    .then(x=>{
        setIdCity(x.data)

    })
    .catch(err => {
            console.log(err);
        })
}
   
 const cityById=(cityName)=>{
    console.log(cityName);
 for(let i=0;i<allCities.length;i++)
    if(allCities[i].name===cityName){
        console.log(allCities[i]);
        getByCId(allCities[i]._id)
    }
 }
 const choosePrice=(price)=>{
    priceSmallEq(price)
    .then((x)=>{
        setPriceList(x.data)
        console.log(x.data);
        
    })
    .catch((x)=>{
        console.log(x);
        
    })

 }
    return <>
   {/* הפרמטר הראשון - האיבר הנוכחי במערך */}
            {/* הפרמטר השני - האינדקס */}
            {/* onChange={(e) => setIdCity(e.target.value)} */}
       
        <input type="number" className="selectC1" placeholder="הכנס מחיר" onChange={(e)=>choosePrice(e.target.value)}></input>
        <select className="selectC" onChange={(e) => cityById(e.target.value)}>
            <option className="optionC" disabled selected >בחר עיר</option>

            {allCities&&allCities.map((item, index) => <option className="optionC" key={index} value={item.name}>{item.name}</option>)}
        </select>
        <div className="AllC">
        {/* <Card key={index} ></Card> */}
        {/* console.log(t),       key={index} aparment={t} */}
            {!priceList&&!idCity&&list&&list.map((x,index) => <Apart key={index} apartment={x}></Apart>)} 
            {!priceList&&idCity&&idCity.map((x,index) => 
             <Apart key={index} apartment={x}></Apart>)}
              {priceList&&priceList.map((x,index) => 
             <Apart key={index} apartment={x}></Apart>)}

        </div>
    
    </>
}